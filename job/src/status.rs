elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, PartialEq, TypeAbi, Debug)]
pub enum EscrowStatus {
    Launched,
    Pending,
    Partial,
    Paid,
    Complete,
    Cancelled,
}
