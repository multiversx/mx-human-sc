mod conftest;

use conftest::setup_contract;
use job::contract_obj;

#[test]
fn test_job_setup() {
    setup_contract(contract_obj);
}

#[test]
fn test_job_view_balance() {
    let mut setup = setup_contract(contract_obj);
    let blockchain_wrapper = &mut setup.blockchain_wrapper;
    let owner_address = &setup.owner_address;
}

