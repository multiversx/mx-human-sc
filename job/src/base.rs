elrond_wasm::imports!();
elrond_wasm::derive_imports!();

use crate::status::EscrowStatus;
use crate::constants::OraclePair;
use crate::constants::UrlHashPair;

const BULK_MAX_COUNT: usize = 100;

#[elrond_wasm::module]
pub trait JobBaseModule {

    fn init_base(
        &self,
        token: EgldOrEsdtTokenIdentifier,
        duration: u64,
        trusted_callers: MultiValueEncoded<ManagedAddress>
    ) {
        self.token().set(token);
        self.status().set(EscrowStatus::Launched);

        let expiration = duration + self.blockchain().get_block_timestamp();
        self.expiration().set(expiration);

        for caller in trusted_callers {
            self.trusted_callers().insert(caller.clone());
        }
    }

    fn require_not_broke(&self) {
        let balance: BigUint = self.get_balance();
        require!(balance != 0, "Contract out of funds")
    }

    fn require_trusted(&self) {
        let current_caller = self.blockchain().get_caller();
        require!(self.trusted_callers().contains(&current_caller), "Caller is not trusted")
    }

    fn require_not_expired(&self) {
        require!(self.expiration().get() > self.blockchain().get_block_timestamp(), "Contract expired");
    }

    fn require_status(&self, allowed_status: &[EscrowStatus]) {
        let current_status = self.status().get();
        require!(
            allowed_status
                .iter()
                .any(|status| current_status == *status),
            "Wrong status"
        );
    }

    fn require_sufficient_balance(&self, payments_total: &BigUint){
        let current_balance = self.get_balance();

        require!(payments_total <= &current_balance, "Not enough funds for payment");
    }

    fn require_payments_not_zero(&self, payments_total: &BigUint) {
        require!(payments_total > &BigUint::zero(), "Cannot process payments with 0 amount")
    }

    fn require_max_recipients(&self, recipients: usize) {
        require!(recipients < BULK_MAX_COUNT, "Too many recipients");
    }

    #[endpoint]
    #[payable("*")]
    fn deposit(&self){
        self.require_trusted();
        self.require_not_expired();
        self.require_status(&[EscrowStatus::Launched, EscrowStatus::Pending, EscrowStatus::Partial]);

        let (token, _, _) = self.call_value().egld_or_single_esdt().into_tuple();
        require!(token == self.token().get(), "Wrong payment token");
    }

    #[endpoint(addTrustedHandlers)]
    fn add_trusted_handlers(&self, trusted_handlers: MultiValueEncoded<ManagedAddress>) {
        self.require_trusted();
        for caller in trusted_handlers {
            self.trusted_callers().insert(caller.clone());
        }
    }

    #[view(getBalance)]
    fn get_balance(&self) -> BigUint {
        let contract_token = self.token().get();

        self.blockchain().get_sc_balance(&contract_token, 0)
    }

    #[view(getToken)]
    #[storage_mapper("token")]
    fn token(&self) -> SingleValueMapper<EgldOrEsdtTokenIdentifier>;

    #[view(getStatus)]
    #[storage_mapper("status")]
    fn status(&self) -> SingleValueMapper<EscrowStatus>;

    #[view(getExpiration)]
    #[storage_mapper("expiration")]
    fn expiration(&self) -> SingleValueMapper<u64>;

    #[storage_mapper("trusted_callers")]
    fn trusted_callers(&self) -> SetMapper<ManagedAddress>;

    #[storage_mapper("oracle_pair")]
    fn oracle_pair(&self) -> SingleValueMapper<OraclePair<Self::Api>>;

    #[view(getManifest)]
    #[storage_mapper("manifest")]
    fn manifest(&self) -> SingleValueMapper<UrlHashPair<Self::Api>>;

    #[storage_mapper("intermediate_results")]
    fn intermediate_results(&self) -> SingleValueMapper<UrlHashPair<Self::Api>>;

    #[storage_mapper("final_results")]
    fn final_results(&self) -> SingleValueMapper<UrlHashPair<Self::Api>>;
}