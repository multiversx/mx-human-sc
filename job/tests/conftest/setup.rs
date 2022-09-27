use elrond_wasm::types::{MultiValueEncoded, EgldOrEsdtTokenIdentifier};
use elrond_wasm_debug::{
    testing_framework::BlockchainStateWrapper,
    tx_mock::TxContextRef,
    DebugApi,
    {rust_biguint, managed_token_id, managed_address},
};
use super::{
    builders::ContractSetup,
    WASM_PATH,
    HMT_TOKEN,
    CF_DEADLINE
};

use job::{ContractObj, JobContract};


/// Setup for the Job Contract. Will initialize the contract builder and initial
/// deploy of the contract
pub fn setup_contract<ContractObjBuilder>(
    cf_builder: ContractObjBuilder
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
        let trusted_callers = MultiValueEncoded::new();
        sc.init(
            EgldOrEsdtTokenIdentifier::esdt(token),
            canceller,
            CF_DEADLINE,
            trusted_callers
        )
    };

    blockchain_wrapper
        .execute_tx(
            &owner_address,
            &contract_wrapper,
            &rust_zero,
            init_contract
        )
        .assert_ok();

    ContractSetup {
        blockchain_wrapper,
        owner_address,
        contract_wrapper,
    }

}
