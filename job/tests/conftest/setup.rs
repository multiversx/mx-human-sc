use super::{builders::ContractSetup, CF_DEADLINE, HMT_TOKEN, WASM_PATH};
use multiversx_sc::types::{EgldOrEsdtTokenIdentifier, MultiValueEncoded};
use multiversx_sc_scenario::{
    multiversx_chain_vm::tx_mock::TxContextRef,
    testing_framework::BlockchainStateWrapper,
    DebugApi, {managed_address, managed_token_id, rust_biguint},
};

use job::{ContractObj, JobContract};

/// Setup for the Job Contract. Will initialize the contract builder and initial
/// deploy of the contract
pub fn setup_contract<ContractObjBuilder>(
    cf_builder: ContractObjBuilder,
) -> ContractSetup<ContractObjBuilder>
where
    ContractObjBuilder: 'static + Copy + Fn() -> job::ContractObj<DebugApi>,
{
    let rust_zero = rust_biguint!(0u64);
    let mut blockchain_wrapper = BlockchainStateWrapper::new();
    let owner_address = blockchain_wrapper.create_user_account(&rust_zero);

    // Create contract wrapper
    let contract_wrapper = blockchain_wrapper.create_sc_account(
        &rust_zero,
        Some(&owner_address),
        cf_builder,
        WASM_PATH,
    );

    // Initialize the job contract closure
    let init_contract = |sc: ContractObj<TxContextRef>| {
        let token = managed_token_id!(HMT_TOKEN);
        let canceller = managed_address!(&owner_address);
        let mut trusted_callers = MultiValueEncoded::new();
        trusted_callers.push(managed_address!(&owner_address));
        sc.init(
            EgldOrEsdtTokenIdentifier::esdt(token),
            canceller,
            CF_DEADLINE,
            trusted_callers,
        )
    };

    blockchain_wrapper
        .execute_tx(&owner_address, &contract_wrapper, &rust_zero, init_contract)
        .assert_ok();

    ContractSetup {
        blockchain_wrapper,
        owner_address,
        contract_wrapper,
    }
}
