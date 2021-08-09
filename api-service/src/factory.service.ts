import { Address, ContractWrapper, SystemWrapper } from '@elrondnetwork/erdjs/out';
import { Injectable } from '@nestjs/common';
import { FactoryGetBody } from 'model/factoryGetBody';
import { GasPayerDto } from 'model/gasPayerDto';
import { AddressDto } from 'model/addressDto';
import { JobListResponse } from 'model/jobListResponse';
import { StringDataResponse } from 'model/stringDataResponse';
import { makeWallet, prepareContract } from './common';

@Injectable()
export class FactoryService {

    constructor(private readonly erdSys: SystemWrapper, private readonly factoryContract: ContractWrapper) { }

    private async prepareFactory(addressDto: AddressDto): Promise<void> {
        prepareContract(addressDto, this.erdSys, this.factoryContract);
    }

    async getFactory(factoryGetBody: FactoryGetBody): Promise<JobListResponse> {
        await this.prepareFactory(factoryGetBody);
        let jobs: Address[] = await this.factoryContract.call.jobs();
        return { jobs: jobs.map((address: Address) => address.bech32()) };
    }

    async newFactory(gasPayerDto: GasPayerDto): Promise<StringDataResponse> {
        let wallet = await makeWallet(gasPayerDto, this.erdSys);
        let token: string = "TODO";
        let jobTemplateAddress: string = "TODO";
        await this.factoryContract.sender(wallet).call.deploy(token, jobTemplateAddress);
        return { data: this.factoryContract.getAddress().bech32() };
    }
}
