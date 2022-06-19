import { Injectable } from '@nestjs/common';
import { ethers, Contract, ContractInterface } from 'ethers';
let secret = require("../../secret.json");

@Injectable()
export class ConnectionService {
  private provider = new ethers.providers.JsonRpcProvider(secret.uri);

  launchToContract(contractAddress: string, contractAbi: ContractInterface): Contract {
    
    return new Contract(contractAddress, contractAbi, this.provider);
  }
}