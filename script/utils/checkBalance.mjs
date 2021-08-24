#!/usr/bin/env node

let [networkChoice, tokenIdentifier, walletChoice] = process.argv.slice(2);

import erdjs from '@elrondnetwork/erdjs';
let { erdSys, wallets } = await erdjs.setupInteractive(networkChoice);
let wallet = wallets[walletChoice];

let humanToken = await erdSys.recallToken(tokenIdentifier);

await erdSys.getBalance(wallet, humanToken).then(erdjs.print);
