import { Injectable,Logger } from '@nestjs/common';
import { ethers, Contract, ContractInterface } from 'ethers';
let secret = require("../../secret.json");

@Injectable()
export class ConnectionService {
  private provider;
  private signer;

  private logger = new Logger(ConnectionService.name);
  constructor(){
    this.provider = new ethers.providers.JsonRpcProvider(secret.uri);
    this.signer = this.provider.getSigner();
    this.logger.log(this.provider);
    this.logger.log(this.signer);
  }
  launchToContract(contractAddress: string, contractAbi: ContractInterface): Contract {
    this.logger.log(this.signer);
    return new Contract(contractAddress, contractAbi, this.signer);
  }
}