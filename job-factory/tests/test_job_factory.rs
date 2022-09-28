mod conftest;

use conftest::*;
use elrond_wasm::types::MultiValueEncoded;
use elrond_wasm_debug::{managed_address, rust_biguint};
use job_factory::{self, JobFactoryContract};
use job;


#[test]
fn test_deploy_job() {
    let mut setup = setup_contract(job_factory::contract_obj, job::contract_obj);
    let blockchain_wrapper = &mut setup.blockchain_wrapper;
    let factory_wrapper = setup.factory_wrapper;
    let owner_address = &setup.owner_address;

    let dummy_addr = factory_wrapper.address_ref().clone();
    let _job_1 = blockchain_wrapper.prepare_deploy_from_sc(&dummy_addr, job::contract_obj);

    blockchain_wrapper
        .execute_tx(owner_address, &factory_wrapper, &rust_biguint!(0u64), |sc| {
            let mut trusted_handlers = MultiValueEncoded::new();
            trusted_handlers.push(managed_address!(owner_address));
            let job_address = sc.create_job(trusted_handlers);
            let result = sc.has_job(job_address);

            assert_eq!(result, true);
        })
        .assert_ok();
    }