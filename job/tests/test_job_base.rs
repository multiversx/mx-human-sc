mod conftest;

use conftest::*;
use multiversx_sc_scenario::{
    rust_biguint,
    managed_biguint,
};
use job::{
    contract_obj,
    base::JobBaseModule
};

#[test]
fn test_job_deploy() {
    setup_contract(contract_obj);
}

#[test]
fn test_job_view_balance() {
    let mut setup = setup_contract(contract_obj);
    let blockchain_wrapper = &mut setup.blockchain_wrapper;
    let owner_address = &setup.owner_address;

    blockchain_wrapper
        .execute_tx(
            &owner_address,
            &setup.contract_wrapper,
            &rust_biguint!(0u64),
            |sc| {
                let sc_balance = sc.get_balance();

                let expected_balance = managed_biguint!(0_000);
                assert_eq!(sc_balance, expected_balance);
            }
        )
        .assert_ok();
}

#[test]
fn test_job_deposit() {
    let mut setup = setup_contract(contract_obj);
    let blockchain_wrapper = &mut setup.blockchain_wrapper;
    let owner_address = &setup.owner_address;

    blockchain_wrapper.set_esdt_balance(&owner_address, HMT_TOKEN, &rust_biguint!(100u64));
    blockchain_wrapper
        .execute_esdt_transfer(
            owner_address,
            &setup.contract_wrapper,
            HMT_TOKEN,
            0,
            &rust_biguint!(5u64), |sc| {
                sc.deposit();
            })
        .assert_ok();

    blockchain_wrapper
        .execute_query(&setup.contract_wrapper, |sc| {
            let sc_balance = sc.get_balance();

            let expected_balance = managed_biguint!(5u64);
            assert_eq!(sc_balance, expected_balance);
        })
        .assert_ok();
}


#[test]
fn test_job_deposit_wrong_token() {
    let mut setup = setup_contract(contract_obj);
    let blockchain_wrapper = &mut setup.blockchain_wrapper;
    let owner_address = &setup.owner_address;

    blockchain_wrapper.set_esdt_balance(&owner_address, OTHER_TOKEN, &rust_biguint!(100u64));
    blockchain_wrapper
        .execute_esdt_transfer(
            owner_address,
            &setup.contract_wrapper,
            OTHER_TOKEN,
            0,
            &rust_biguint!(5u64), |sc| {
                sc.deposit();
            })
        .assert_error(4, "Wrong payment token");
}