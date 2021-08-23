#!/usr/bin/env node

let [networkChoice, tokenIdentifier, from, to, amount] = process.argv.slice(2);

import erdjs from '@elrondnetwork/erdjs';
let { erdSys, wallets } = await erdjs.setupInteractive(networkChoice);
let fromWallet = wallets[from];
let toWallet = wallets[to];

let humanToken = await erdSys.recallToken(tokenIdentifier);
console.log(`Sender: ${fromWallet}`);
await erdSys.sender(fromWallet).value(humanToken(amount)).send(toWallet);
