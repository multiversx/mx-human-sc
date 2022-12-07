#!/bin/bash

set +e

TOKEN_ID="HPX-e3d85c"
TEMPLATE_ADDRESS="0x$(erdpy wallet bech32 --decode $1)"
WASM_PATH="../output/job-factory.wasm"
WALLET_PEM="~/erd-wallets/JonesTest.pem"
PROXY="https://testnet-gateway.elrond.com"
CHAIN_ID="T"

erdpy --verbose contract deploy --recall-nonce \
    --pem=${WALLET_PEM} \
    --gas-limit=200000000 \
    --proxy=${PROXY} --chain=${CHAIN_ID} \
    --bytecode=${WASM_PATH} \
    --arguments str:${TOKEN_ID} ${TEMPLATE_ADDRESS} \
    --outfile="deploy-job-factory-test.interaction.json" \
    --send || return