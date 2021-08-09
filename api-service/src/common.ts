import { Address, ContractWrapper, SystemWrapper } from "@elrondnetwork/erdjs/out";
import { TestWallet } from "@elrondnetwork/erdjs/out/testutils";
import { GasPayerDto } from "model/gasPayerDto";
import { AddressDto } from "model/addressDto";

export async function makeWallet(gasPayerDto: GasPayerDto, erdSys: SystemWrapper): Promise<TestWallet> {
    let wallet = new TestWallet(new Address(gasPayerDto.gasPayer), gasPayerDto.gasPayerPrivate, null, null);
    await wallet.sync(erdSys.provider);
    return wallet;
}

export async function prepareContract(addressDto: AddressDto, erdSys: SystemWrapper, contract: ContractWrapper): Promise<void> {
    let wallet = await makeWallet(addressDto, erdSys);
    contract.address(addressDto.address).sender(wallet);
}
