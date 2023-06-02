mod conftest;

use conftest::*;
use job_factory::{self, JobFactoryContract};
use multiversx_sc::types::MultiValueEncoded;
use multiversx_sc_scenario::{managed_address, rust_biguint};

#[test]
fn test_deploy_job() {
    let mut setup = setup_contract(job_factory::contract_obj, job::contract_obj);
    let blockchain_wrapper = &mut setup.blockchain_wrapper;
    let factory_wrapper = setup.factory_wrapper;
    let owner_address = &setup.owner_address;

    let dummy_addr = factory_wrapper.address_ref().clone();
    blockchain_wrapper.prepare_deploy_from_sc(&dummy_addr, job::contract_obj);

    blockchain_wrapper
        .execute_tx(
            owner_address,
            &factory_wrapper,
            &rust_biguint!(0u64),
            |sc| {
                let mut trusted_handlers = MultiValueEncoded::new();
                trusted_handlers.push(managed_address!(owner_address));
                let new_job_contract_address = sc.create_job(trusted_handlers);
                let result = sc.has_job(new_job_contract_address);

                assert!(result);
            },
        )
        .assert_ok();
}
