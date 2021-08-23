elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, NestedEncode, NestedDecode, TypeAbi)]
pub struct UrlHashPair {
    pub url: BoxedBytes,
    pub hash: BoxedBytes,
}
