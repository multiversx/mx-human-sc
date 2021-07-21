#!/bin/sh

./build-contracts.sh
cargo test --features elrond-wasm-debug/arwen-tests
