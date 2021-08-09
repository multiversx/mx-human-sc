import erdjs from '@elrondnetwork/erdjs';
let { erdSys, Egld, wallets: { alice } } = await erdjs.setupInteractive("local-testnet");

let token = Egld;
let canceler = alice;
let duration = 0;
let job = await erdSys.loadWrapper("job");
await job.sender(alice).gas(200_000_000).call.deploy(token, canceler, duration);

let jobFactory = await erdSys.loadWrapper("job-factory");
await jobFactory.sender(alice).gas(200_000_000).call.deploy(token, job);
console.log(jobFactory.getAddress());
