mod builders;
mod setup;

pub use setup::setup_contract;

pub const WASM_PATH: &'static str = "output/job.wasm";
pub const HMT_TOKEN: &[u8] = b"HMT-abcdef";
pub const OTHER_TOKEN: &[u8] = b"OTHER-123456";
pub const CF_DEADLINE: u64 = 7 * 24 * 60 * 60;
