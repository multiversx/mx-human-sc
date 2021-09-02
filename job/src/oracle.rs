elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(NestedEncode, NestedDecode, TypeAbi)]
pub struct Oracle<BigUint: BigUintApi> {
    pub address: Address,
    pub stake: BigUint,
}

#[derive(TopEncode, TopDecode, TypeAbi)]
pub struct OraclePair<BigUint: BigUintApi> {
    pub reputation: Oracle<BigUint>,
    pub recording: Oracle<BigUint>,
}
