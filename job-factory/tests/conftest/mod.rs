mod builders;
mod setup;

pub use setup::setup_contract;

pub const WASM_PATH: &'static str = "output/job-factory.wasm";
pub const HMT_TOKEN: &[u8] = b"HMT-abcdef";
pub const JOB_WASM_PATH: &'static str = "job/output/job.wasm";