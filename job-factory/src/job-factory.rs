#![no_std]

elrond_wasm::imports!();

#[elrond_wasm::contract]
pub trait Factory {
    #[init]
    fn init(&self, token: TokenIdentifier, job_template_address: Address) {
        self.token().set(&token);
        self.job_template_address().set(&job_template_address);
    }

    #[endpoint(createJob)]
    fn create_job(&self, #[var_args] trusted_handlers: VarArgs<Address>) -> SCResult<Address> {
        let mut arguments: ArgBuffer = ArgBuffer::new();
        arguments.push_argument_bytes(self.token().get().as_esdt_identifier());

        let canceler = self.blockchain().get_caller();
        arguments.push_argument_bytes(canceler.as_bytes());

        const CONTRACT_DURATION: u64 = 8640000; // 100 days
        arguments.push_argument_bytes(&CONTRACT_DURATION.to_be_bytes());

        for trusted_handler in trusted_handlers.iter() {
            arguments.push_argument_bytes(trusted_handler.as_bytes());
        }

        let job_address = self
            .send()
            .deploy_from_source_contract(
                self.blockchain().get_gas_left(),
                &Self::BigUint::zero(),
                &self.job_template_address().get(),
                CodeMetadata::DEFAULT,
                &arguments,
            )
            .ok_or("Job deployment failed")?;
        self.jobs().insert(job_address.clone());
        Ok(job_address)
    }

    #[view(hasJob)]
    fn has_job(&self, address: Address) -> bool {
        self.jobs().contains(&address)
    }

    // storage

    #[storage_mapper("job_template_address")]
    fn job_template_address(&self) -> SingleValueMapper<Self::Storage, Address>;

    #[view]
    #[storage_mapper("jobs")]
    fn jobs(&self) -> SafeSetMapper<Self::Storage, Address>;

    #[view]
    #[storage_mapper("token")]
    fn token(&self) -> SingleValueMapper<Self::Storage, TokenIdentifier>;
}
