import fetch from 'node-fetch';
import {
    Address,
    ContractWrapper,
    setupInteractive,
    SystemWrapper,
} from '@elrondnetwork/erdjs/out';
import { TestWallet } from '@elrondnetwork/erdjs/out/testutils';
import { GasPayerDto } from 'model/gasPayerDto';
import { AddressDto } from 'model/addressDto';
import { ApiConfigService } from './apiConfigService';
import { StorageService } from './storage.service';

export async function makeWallet(
    gasPayerDto: GasPayerDto,
    erdSys: SystemWrapper,
): Promise<TestWallet> {
    const wallet = new TestWallet(
        new Address(gasPayerDto.gasPayer),
        gasPayerDto.gasPayerPrivate,
        null,
        null,
    );
    await wallet.sync(erdSys.getProvider());
    return wallet;
}

export async function prepareContract(
    addressDto: AddressDto,
    erdSys: SystemWrapper,
    contract: ContractWrapper,
): Promise<void> {
    const wallet = await makeWallet(addressDto, erdSys);
    console.log(`sender: ${wallet.address.bech32()}`);
    contract.address(addressDto.address).sender(wallet);
}

export async function loadContracts(config: ApiConfigService) {
    const { erdSys } = await setupInteractive(config.networkProvider);
    const jobContract = await erdSys.loadWrapper('../job');
    const factoryContract = await erdSys.loadWrapper('../job-factory');
    const humanToken = await erdSys.recallToken(config.humanTokenIdentifier);
    return { erdSys, jobContract, factoryContract, humanToken };
}

export async function getJsonFromUrl(url: string): Promise<any> {
    return await fetch(url).then((res) => res.json());
}

export async function uploadFromUrl(
    sourceUrl: string,
    pubKey: string,
    storage: StorageService,
): Promise<{ hash: string; url: string; json: any }> {
    const json = await getJsonFromUrl(sourceUrl);
    const jsonString = JSON.stringify(json);
    console.log(`Downloaded JSON: ${jsonString}`);
    const { hash, key: url } = await storage.upload(jsonString, pubKey);
    return { hash, url, json };
}
