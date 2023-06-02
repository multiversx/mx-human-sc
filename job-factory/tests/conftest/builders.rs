use multiversx_sc::types::Address;

use multiversx_sc_scenario::DebugApi;
use multiversx_sc_scenario::whitebox::{BlockchainStateWrapper, ContractObjWrapper};


pub struct ContractSetup<JobFactoryBuilder, JobBuilder>
where
    JobFactoryBuilder: 'static + Copy + Fn() -> job_factory::ContractObj<DebugApi>,
    JobBuilder: 'static + Copy + Fn() -> job::ContractObj<DebugApi>
{
    // Blockchain specific properties
    pub blockchain_wrapper: BlockchainStateWrapper,
    pub factory_wrapper: ContractObjWrapper<job_factory::ContractObj<DebugApi>, JobFactoryBuilder>,
    pub job_wrapper: ContractObjWrapper<job::ContractObj<DebugApi>, JobBuilder>,

    // Contract specific properties
    pub owner_address: Address,
}



