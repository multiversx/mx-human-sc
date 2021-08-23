#!/usr/bin/env node

let [networkChoice, ownerWalletName] = process.argv.slice(2);

import erdjs from '@elrondnetwork/erdjs';
let { erdSys, wallets } = await erdjs.setupInteractive(networkChoice);
let owner = wallets[ownerWalletName];

let job = await erdSys.loadWrapper("job");
await job.sender(owner).gas(150_000_000).call.deploy('-', owner, 0);
console.log(`Job template address: ${job.getAddress().bech32()}`);
