# sc-human-rs

Human Protocol smart contracts for the MultiversX ecosystem

Smart contracts
===

Job smart contract
- acts as an escrow for funds and dispatches them once the tasks are completed
- gives a percentage of the sent funds to the reporting oracle and the recording oracle
- ported from [Escrow.sol](https://github.com/humanprotocol/hmt-escrow/blob/master/contracts/Escrow.sol)

Job-factory smart contract
- creates jobs based on a template
- ported from [EscrowFactory.sol](https://github.com/humanprotocol/hmt-escrow/blob/master/contracts/EscrowFactory.sol)
- note: compared to the original implementation, the template is created from an already-deployed contract through `deploy_from_source_contract`

Scripts
===

## Contract scripts

- `script/contracts/bootstrap` - set up the required dependencies
- `script/contracts/console` - start a node console which may be used to interact with the blockchain

## API service scripts

- `script/api-service/bootstrap` - sets up the required dependencies
- `script/api-service/build` - builds the API service
- `script/api-service/server-dev` - starts the api service

Console functions
===

After starting a console via `script/contracts/console`, the following functions may be called:

- `setup(networkChoice)` - initializes erdjs (callable with `'local-testnet'`, `'elrond-testnet'`, `'elrond-devnet'` or `'elrond-mainnet'`)
- `issueToken(owner, initialAmount, name = 'HumanToken', identifier = 'HMT', decimals = 18)` - issues the Human Token
- `recallToken(tokenIdentifier)` - recalls the Human Token (if already deployed)
- `deployJobTemplate(owner)` - deploys the job contract as a template and prints information for `config.env`
- `loadWallet(pemPath)` - loads a wallet from a PEM file, synchronizes its nonce and returns it
- `printKeys(wallet)` - prints the public and private keys of a wallet
- `transferToken(from, to, amount)` - transfers HMTs between two wallets
- `checkBalance(wallet)` - checks the HMT balance of an account

Setup
===

```bash
make setup
```

## Setup clean
Only if you want to clean your builds
```bash
make clean
```

Test
===

To run all the tests use the command:
```bash
make test
```

For running individual tests you have two commands:

- `job` contract
```bash
make test-job
```

- `job-factory` contract
```bash
make test-job-factory
```

Deploying on the local testnet
===

First start a [local testnet](https://docs.elrond.com/developers/setup-local-testnet/).

```bash
script/contracts/console
```

Then, in the node console, run the following:
```javascript
await setup('local-testnet');
await issueToken(alice, 1_000_000);
await deployJobTemplate(alice);
await printKeys(alice);
```

Loading an existing token
===

When using an already deployed token, instead of calling `issueToken`, use the following (replace `HMT-12345` with your own token identifier):
```javascript
await setup('local-testnet');
await recallToken('HMT-12345');
```

Service configuration
===
Copy the `api-service/config.template.env` and rename it to `api-service/config.env`
Configure the `AWS_*` variables according to your S3 account (note: `AWS_ENDPOINT_URL` is optional - and may be ommited if using Amazon S3).
For the `NETWORK_PROVIDER`, `HUMAN_TOKEN_IDENTIFIER` and the `JOB_TEMPLATE_ADDRESS`, use the output of the respective steps (setup, issue and deploy).

Starting the service
===

Run:
`script/api-service/bootstrap`
`script/api-service/build`
`script/api-service/server-dev`

Using the API
===
From the [API page](http://localhost:3000/api/) you can call any endpoint.

### Creating a new factory

Use the `POST /factory` endpoint with the following payload to create a new factory.
The keys are from the `alice` test wallet.
```json
{
  "gasPayer": "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th",
  "gasPayerPrivate": "413f42575f7f26fad3317a778771212fdb80245850981e48b58a4f25e344e8f9"
}
```

### Create a new job

When calling the `POST /job` endpoint, use:
```json
{
  "gasPayer": "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th",
  "gasPayerPrivate": "413f42575f7f26fad3317a778771212fdb80245850981e48b58a4f25e344e8f9",
  "factoryAddress": "erd1qqqqqqqqqqqqqpgqygvvtlty3v7cad507v5z793duw9jjmlxd8sszs8a2y",
  "repOraclePub":"552e2b308514b38e4989d71ed263e0af6376f65ba81a94ebb74f6fadc223ee80aa8fb710cfb445e0871cd1c1a0c1f2adb2b6eedc2a0470b04244548c5be518c8",
  "manifestUrl": "https://pastebin.com/raw/YVw3qhcf"
}
```

Note: The manifest for creating a new factory should look like this:
```json
{
  "task_bid_price": "50",
  "job_total_tasks": "10",
  "reputation_oracle_addr": "erd1k2s324ww2g0yj38qn2ch2jwctdy8mnfxep94q9arncc6xecg3xaq6mjse8",
  "recording_oracle_addr": "erd1kyaqzaprcdnv4luvanah0gfxzzsnpaygsy6pytrexll2urtd05ts9vegu7",
  "oracle_stake": "3"
}
```
The reputation oracle are those of test wallet `carol` and `dan`.

Payouts can be done via `POST /job/bulkPayout`, with:
```json
{
  "gasPayer": "erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th",
  "gasPayerPrivate": "413f42575f7f26fad3317a778771212fdb80245850981e48b58a4f25e344e8f9",
  "address": "erd1qqqqqqqqqqqqqpgq0ddexy8ahtknt3zwg99nfcn6965ydgu4d8ssa2m4h3",
  "repOraclePub": "552e2b308514b38e4989d71ed263e0af6376f65ba81a94ebb74f6fadc223ee80aa8fb710cfb445e0871cd1c1a0c1f2adb2b6eedc2a0470b04244548c5be518c8",
  "resultsUrl": "https://pastebin.com/raw/TQVKT8b1",
  "payoutsUrl": "https://pastebin.com/raw/VKssHk0p"
}
```

For the bulk payouts, the payments should be a list of `(address, amount)` pairs, such as:
```json
[
  ["erd18tudnj2z8vjh0339yu3vrkgzz2jpz8mjq0uhgnmklnap6z33qqeszq2yn4", "100"],
  ["erd1kdl46yctawygtwg2k462307dmz2v55c605737dp3zkxh04sct7asqylhyv", "400"]
]
```
The addresses are those of test wallets' `eve` and `frank`.

Checking the balance via the node console outputs:
```javascript
> await checkBalance(carol);
15.000000000000000000 HMT-035e27
undefined
> await checkBalance(dan);
15.000000000000000000 HMT-035e27
undefined
> await checkBalance(eve);
94.000000000000000000 HMT-035e27
undefined
> await checkBalance(frank);
376.000000000000000000 HMT-035e27
undefined
```

The `carol` and `dan` oracles each got 3% of the total rewards (15 tokens each).
The `eve` and `frank` wallets got the sums described at the payouts URL, minus the oracle fees of 6% (3% per oracle).

Accessing `GET /job/finalResults` with:

`gasPayer=erd1qyu5wthldzr8wx5c9ucg8kjagg0jfs53s8nr3zpz3hypefsdd8ssycr6th`

`gasPayerPrivate=413f42575f7f26fad3317a778771212fdb80245850981e48b58a4f25e344e8f9`

`address=erd1qqqqqqqqqqqqqpgq0ddexy8ahtknt3zwg99nfcn6965ydgu4d8ssa2m4h3`

`repOraclePrivate=27f07d3251dee39ec2c5ff800641f4d839e6f8065033e9a710ea2e519473bdd7`

returns:

`{"data":"{\"test\":\"results\"}"}`

which represent the decrypted final results.

Notes about encryption
===

The wallets used here (`alice`, `bob`, `carol`, `dan`, `eve`, `frank`) are publicly known.

The ECIES private / public key pair used here (as the reputation oracle's keys) is also publicly known (from the ECIES examples [here](https://cryptobook.nakov.com/asymmetric-key-ciphers/ecies-example)).

**In production do not use these. Generate separate wallets and ECIES key pairs.**
