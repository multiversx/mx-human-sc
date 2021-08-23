#!/usr/bin/env node

let [networkChoice, ownerWalletName, name, identifier, initialSum] = process.argv.slice(2);

import erdjs from '@elrondnetwork/erdjs';
let { erdSys, wallets } = await erdjs.setupInteractive(networkChoice);
let owner = wallets[ownerWalletName];

let unissuedToken = erdjs.createBalanceBuilder(new erdjs.Token({ identifier, name, decimals: 18, type: erdjs.TokenType.Fungible }));
let humanToken = await erdSys.sender(owner).issueFungible(name, identifier, unissuedToken(initialSum), unissuedToken.getToken().decimals);
console.log(`Token identifier: ${humanToken.getTokenIdentifier()}`);
