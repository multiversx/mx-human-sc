# sc-human-rs
Human Protocol smart contracts for the Elrond ecosystem

Smart contracts
===

Job smart contract
- acts as an escrow for funds and dispatches them once the tasks are completed
- gives a percentage of the sent funds to the reporting oracle and the recording oracle
- ported from [Escrow.sol](https://github.com/humanprotocol/hmt-escrow/blob/master/contracts/Escrow.sol)

Job-factory smart contract
- creates jobs based on a template
- ported from [EscrowFactory.sol](https://github.com/humanprotocol/hmt-escrow/blob/master/contracts/EscrowFactory.sol)
- note: compared to the original implementation, the template is created from an already-deployed contract through `deploy_from_source_contract`
