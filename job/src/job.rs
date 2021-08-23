#![no_std]
#![feature(destructuring_assignment)]

use oracle::{Oracle, OraclePair};
use status::Status;
use url_hash_pair::UrlHashPair;

elrond_wasm::imports!();

mod oracle;
mod status;
mod url_hash_pair;

#[elrond_wasm::contract]
pub trait Job {
    #[init]
    fn init(
        &self,
        token: TokenIdentifier,
        canceler: Address,
        duration: u64,
        #[var_args] trusted_handlers: VarArgs<Address>,
    ) {
        self.token().set(&token);
        self.status().set(&Status::Launched);
        let expiration = duration + self.blockchain().get_block_timestamp();
        self.expiration().set(&expiration);
        let caller = self.blockchain().get_caller();
        self.launcher().set(&caller);
        self.canceler().set(&canceler);
        self.insert_trusted_handlers(&[caller, canceler]);
        self.insert_trusted_handlers(trusted_handlers.as_slice());
    }

    #[payable("*")]
    #[endpoint]
    fn deposit(&self, #[payment_token] token: TokenIdentifier) -> SCResult<()> {
        self.require_trusted()?;
        self.require_not_expired()?;
        self.require_status(&[Status::Launched, Status::Pending, Status::Partial])?;
        require!(token == self.token().get(), "Wrong payment token");
        Ok(())
    }

    #[view(getBalance)]
    fn get_balance(&self) -> Self::BigUint {
        self.blockchain().get_sc_balance(&self.token().get(), 0)
    }

    #[endpoint(addTrustedHandlers)]
    fn add_trusted_handlers(&self, #[var_args] trusted_handlers: VarArgs<Address>) -> SCResult<()> {
        self.require_trusted()?;
        self.insert_trusted_handlers(trusted_handlers.as_slice());
        Ok(())
    }

    #[endpoint]
    fn setup(
        &self,
        reputation_oracle: Address,
        recording_oracle: Address,
        reputation_oracle_stake: Self::BigUint,
        recording_oracle_stake: Self::BigUint,
        url: BoxedBytes,
        hash: BoxedBytes,
    ) -> SCResult<()> {
        self.require_trusted()?;
        self.require_not_expired()?;
        self.require_status(&[Status::Launched])?;

        let total_stake = &reputation_oracle_stake + &recording_oracle_stake;
        require!(total_stake <= 100u64, "Stake out of bounds");

        self.oracle_pair().set(&OraclePair {
            reputation: Oracle {
                address: reputation_oracle.clone(),
                stake: reputation_oracle_stake,
            },
            recording: Oracle {
                address: recording_oracle.clone(),
                stake: recording_oracle_stake,
            },
        });
        self.insert_trusted_handlers(&[recording_oracle, reputation_oracle]);
        self.manifest().set(&UrlHashPair {
            url: url.clone(),
            hash: hash.clone(),
        });

        self.status().set(&Status::Pending);
        self.pending_event(url, hash);

        Ok(())
    }

    #[endpoint(storeResults)]
    fn store_results(&self, url: BoxedBytes, hash: BoxedBytes) -> SCResult<()> {
        self.require_trusted()?;
        self.require_not_expired()?;
        self.require_status(&[Status::Pending, Status::Partial])?;

        self.intermediate_results().set(&UrlHashPair { url, hash });
        Ok(())
    }

    #[endpoint(bulkPayOut)]
    fn bulk_pay_out(
        &self,
        payments: Vec<(Address, Self::BigUint)>,
        #[var_args] final_results: OptionalArg<UrlHashPair>,
    ) -> SCResult<()> {
        self.require_trusted()?;
        self.require_not_expired()?;
        self.require_status(&[Status::Pending, Status::Partial])?;
        self.require_not_broke()?;

        let token = self.token().get();
        let oracles = self.oracle_pair().get();

        let mut recording_fee = Self::BigUint::zero();
        let mut reputation_fee = Self::BigUint::zero();

        for (to, amount) in payments {
            let mut payout = amount.clone();
            (payout, reputation_fee) =
                self.transfer_fee(payout, reputation_fee, &amount, &oracles.reputation.stake);
            (payout, recording_fee) =
                self.transfer_fee(payout, recording_fee, &amount, &oracles.recording.stake);
            self.send().direct(&to, &token, 0, &payout, &[]);
        }

        self.send()
            .direct(&oracles.reputation.address, &token, 0, &reputation_fee, &[]);
        self.send()
            .direct(&oracles.recording.address, &token, 0, &recording_fee, &[]);

        let next_status = if self.get_balance() != 0 {
            Status::Partial
        } else {
            Status::Paid
        };
        self.status().set(&next_status);

        if let Some(results) = final_results.into_option() {
            self.final_results().set(&results);
        }
        Ok(())
    }

    #[endpoint]
    fn abort(&self) -> SCResult<()> {
        self.require_trusted()?;
        self.require_status(&[Status::Launched, Status::Pending, Status::Partial])?;

        if self.get_balance() != 0 {
            self.cancel()?;
        }
        self.status().set(&Status::Cancelled);
        Ok(())
    }

    #[endpoint]
    fn cancel(&self) -> SCResult<()> {
        self.require_trusted()?;
        self.require_status(&[Status::Launched, Status::Pending, Status::Partial])?;
        self.require_not_broke()?;

        self.send().direct(
            &self.canceler().get(),
            &self.token().get(),
            0,
            &self.get_balance(),
            &[],
        );
        self.status().set(&Status::Cancelled);

        Ok(())
    }

    #[endpoint]
    fn complete(&self) -> SCResult<()> {
        self.require_trusted()?;
        self.require_not_expired()?;
        self.require_status(&[Status::Paid])?;

        self.status().set(&Status::Complete);
        Ok(())
    }

    #[view(getIntermediateResults)]
    fn get_intermediate_results(&self) -> SCResult<UrlHashPair> {
        require!(
            !self.intermediate_results().is_empty(),
            "intermediate results are not set"
        );
        Ok(self.intermediate_results().get())
    }

    #[view(getFinalResults)]
    fn get_final_results(&self) -> SCResult<UrlHashPair> {
        require!(
            !self.final_results().is_empty(),
            "final results are not set"
        );
        Ok(self.final_results().get())
    }

    fn transfer_fee(
        &self,
        mut from_amount: Self::BigUint,
        mut to_amount: Self::BigUint,
        original_amount: &Self::BigUint,
        percentage: &Self::BigUint,
    ) -> (Self::BigUint, Self::BigUint) {
        let transferred_amount = original_amount * percentage / Self::BigUint::from(100u64);
        from_amount -= &transferred_amount;
        to_amount += &transferred_amount;
        (from_amount, to_amount)
    }

    fn require_trusted(&self) -> SCResult<()> {
        require!(
            self.trusted_handlers()
                .contains(&self.blockchain().get_caller()),
            "Caller not trusted"
        );
        Ok(())
    }

    fn require_not_expired(&self) -> SCResult<()> {
        let not_expired = self.expiration().get() > self.blockchain().get_block_timestamp();
        require!(not_expired, "Contract expired");
        Ok(())
    }

    fn require_not_broke(&self) -> SCResult<()> {
        require!(self.get_balance() != 0, "Out of funds");
        Ok(())
    }

    fn require_status(&self, allowed_status: &[Status]) -> SCResult<()> {
        let current_status = self.status().get();
        require!(
            allowed_status
                .iter()
                .any(|status| current_status == *status),
            "Wrong status"
        );
        Ok(())
    }

    fn insert_trusted_handlers(&self, trusted_handlers: &[Address]) {
        let mut storage = self.trusted_handlers();
        for trusted_handler in trusted_handlers.iter().cloned() {
            storage.insert(trusted_handler);
        }
    }

    // storage

    #[view(getToken)]
    #[storage_mapper("token")]
    fn token(&self) -> SingleValueMapper<Self::Storage, TokenIdentifier>;

    #[view(getStatus)]
    #[storage_mapper("status")]
    fn status(&self) -> SingleValueMapper<Self::Storage, Status>;

    #[view(getManifest)]
    #[storage_mapper("manifest")]
    fn manifest(&self) -> SingleValueMapper<Self::Storage, UrlHashPair>;

    #[view(getLauncher)]
    #[storage_mapper("launcher")]
    fn launcher(&self) -> SingleValueMapper<Self::Storage, Address>;

    #[view(getCanceler)]
    #[storage_mapper("canceler")]
    fn canceler(&self) -> SingleValueMapper<Self::Storage, Address>;

    #[view(getExpiration)]
    #[storage_mapper("expiration")]
    fn expiration(&self) -> SingleValueMapper<Self::Storage, u64>;

    #[view(getTrustedHandlers)]
    #[storage_mapper("trusted_handlers")]
    fn trusted_handlers(&self) -> SafeSetMapper<Self::Storage, Address>;

    #[view(getOraclePair)]
    #[storage_mapper("oracles")]
    fn oracle_pair(&self) -> SingleValueMapper<Self::Storage, OraclePair<Self::BigUint>>;

    #[storage_mapper("intermediate_results")]
    fn intermediate_results(&self) -> SingleValueMapper<Self::Storage, UrlHashPair>;

    #[storage_mapper("final_results")]
    fn final_results(&self) -> SingleValueMapper<Self::Storage, UrlHashPair>;

    // events

    #[event("pending")]
    fn pending_event(&self, #[indexed] url: BoxedBytes, #[indexed] hash: BoxedBytes);
}
