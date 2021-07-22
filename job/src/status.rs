elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, PartialEq, TypeAbi)]
pub enum Status {
    Launched,
    Pending,
    Partial,
    Paid,
    Complete,
    Cancelled,
}
