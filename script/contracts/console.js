global.setup = async (networkChoice) => {
    global.erdjs = require('@elrondnetwork/erdjs');
    let { erdSys, wallets } = await erdjs.setupInteractive(networkChoice);
    global.erdSys = erdSys;
    for (walletName in wallets) {
        global[walletName] = wallets[walletName];
    }
    console.log(`Add this to the config.env:\nNETWORK_PROVIDER=${networkChoice}`);
}

global.issueToken = async (
    owner,
    initialAmount,
    name = 'HumanToken',
    identifier = 'HMT',
    decimals = 18
) => {
    let unissuedToken = erdjs.createBalanceBuilder(new erdjs.Token({ identifier, name, decimals, type: erdjs.TokenType.Fungible }));
    global.humanToken = await erdSys.sender(owner).issueFungible(name, identifier, unissuedToken(initialAmount), decimals);
    console.log(`Add the token identifier to config.env:\nHUMAN_TOKEN_IDENTIFIER=${humanToken.getTokenIdentifier()}`);
}

global.recallToken = async (tokenIdentifier) => {
    global.humanToken = await erdSys.recallToken(tokenIdentifier);
}

global.deployJobTemplate = async (owner) => {
    let job = await erdSys.loadWrapper("job");
    await job.sender(owner).gas(130_000_000).call.deploy('-', owner, 0);
    console.log(`Add this to the config.env:\nJOB_TEMPLATE_ADDRESS=${job.getAddress().bech32()}`);
}

global.printKeys = (wallet) => {
    console.log(`public: "${wallet.address.bech32()}",`);
    console.log(`private: "${wallet.secretKey.toString('hex')}",`);
}

global.transferToken = async (from, to, amount) => {
    await erdSys.sender(from).value(humanToken(amount)).send(to);
}

global.checkBalance = async (wallet) => {
    await erdSys.getBalance(wallet, humanToken).then(erdjs.print);
}
