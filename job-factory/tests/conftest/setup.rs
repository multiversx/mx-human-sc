use super::{builders::ContractSetup, HMT_TOKEN, JOB_WASM_PATH, WASM_PATH};
use multiversx_sc::types::EgldOrEsdtTokenIdentifier;
use multiversx_sc_scenario::{
    whitebox::BlockchainStateWrapper,
    DebugApi, {managed_address, managed_token_id, rust_biguint},
};

use job_factory::JobFactoryContract;

/// Setup for the Job Contract. Will initialize the contract builder and initial
/// deploy of the contract
pub fn setup_contract<JobFactoryBuilder, JobBuilder>(
    factory_builder: JobFactoryBuilder,
    job_builder: JobBuilder,
) -> ContractSetup<JobFactoryBuilder, JobBuilder>
where
    JobFactoryBuilder: 'static + Copy + Fn() -> job_factory::ContractObj<DebugApi>,
    JobBuilder: 'static + Copy + Fn() -> job::ContractObj<DebugApi>,
{
    let rust_zero = rust_biguint!(0u64);
    let mut blockchain_wrapper = BlockchainStateWrapper::new();
    let owner_address = blockchain_wrapper.create_user_account(&rust_zero);

    // Create job factory wrapper
    let factory_wrapper = blockchain_wrapper.create_sc_account(
        &rust_zero,
        Some(&owner_address),
        factory_builder,
        WASM_PATH,
    );

    // Create job wrapper
    let job_wrapper = blockchain_wrapper.create_sc_account(
        &rust_zero,
        Some(&owner_address),
        job_builder,
        JOB_WASM_PATH,
    );

    blockchain_wrapper
        .execute_tx(&owner_address, &factory_wrapper, &rust_zero, |sc| {
            let token = managed_token_id!(HMT_TOKEN);
            sc.init(
                EgldOrEsdtTokenIdentifier::esdt(token),
                managed_address!(job_wrapper.address_ref()),
            )
        })
        .assert_ok();

    ContractSetup {
        blockchain_wrapper,
        owner_address,
        factory_wrapper,
        job_wrapper,
    }
}
