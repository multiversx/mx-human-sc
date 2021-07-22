elrond_wasm::imports!();
elrond_wasm::derive_imports!();

#[derive(TopEncode, TopDecode, TypeAbi)]
pub struct UrlHashPair {
    pub url: BoxedBytes,
    pub hash: BoxedBytes,
}
