#!/usr/bin/env node

let [walletName] = process.argv.slice(2);

import { loadTestWallets } from '@elrondnetwork/erdjs/out/testutils/index.js';
let wallets = await loadTestWallets();
let wallet = wallets[walletName];

console.log(`public: "${wallet.address.bech32()}",`);
console.log(`private: "${wallet.secretKey.toString('hex')}",`);
