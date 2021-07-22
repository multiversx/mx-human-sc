#!/bin/sh

./build-wasm.sh
cargo test --features elrond-wasm-debug/arwen-tests
