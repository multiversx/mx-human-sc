use multiversx_sc::types::Address;

use multiversx_sc_scenario::DebugApi;
use multiversx_sc_scenario::whitebox::{BlockchainStateWrapper, ContractObjWrapper};


pub struct ContractSetup<ContractObjBuilder>
where
    ContractObjBuilder: 'static + Copy + Fn() -> job::ContractObj<DebugApi>,
{
    // Blockchain specific properties
    pub blockchain_wrapper: BlockchainStateWrapper,
    pub contract_wrapper: ContractObjWrapper<job::ContractObj<DebugApi>, ContractObjBuilder>,

    // Contract specific properties
    pub owner_address: Address,
}

