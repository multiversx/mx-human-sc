use elrond_wasm::types::Address;

use elrond_wasm_debug::DebugApi;
use elrond_wasm_debug::testing_framework::{BlockchainStateWrapper, ContractObjWrapper};


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

