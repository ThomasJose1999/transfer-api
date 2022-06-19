import { Injectable } from "@nestjs/common";
import { Contract } from "ethers";
const { ethers } = require("hardhat");
// import { ConfigService } from '@nestjs/config';
import { ConnectionService } from '../connection/connection.service';
import { contractAddress, contractAbi } from '../../config';
let secret = require("../../secret.json");
// import transfer from '../../artifacts/contracts/transfer.sol/transfer.json';

// import * as tranfer from '../../artifacts/contracts/transfer.sol/transfer.json';

@Injectable()
export class ContractServices {
    private transferContract: Contract;
    
    contructor(connectionService: ConnectionService) {
        // this.transferContract = this.getTransferContract();
        try {
            
            const provider = new ethers.providers.JsonRpcProvider(secret.uri);
            this.transferContract = new ethers.Contract(contractAddress, contractAbi, provider);
            // return connectionService.launchToContract(TransferContractAddress, TransferContractAbi);
          } catch (error) {
            throw new Error('Unable to connect to transfer contract');
          }
    }

    async getBalance(): Promise<string> {
        try {
          console.log(secret.uri,"#################uri###########");
            console.log(this.transferContract, "################################");
            const balance = await this.transferContract.balanceOfContract();
            
            return balance.toString();
        } catch (error) {
          console.log(error);
          throw new Error('Unable to check account balance');
        }
      }

      


    async sendTransaction(address:string, value: string): Promise<string> {
        try{
            
            await this.transferContract.sendMoney(address, ethers.utils.parseEther(value));
            return "Transfer was successful";
        } catch(error){
            throw new Error('Unable to Transact');
        }
    }

    


}


// import { Injectable } from '@nestjs/common';
// import { Contract } from 'ethers';
// import { ConfigService } from '@nestjs/config';
// import { ConnectionService } from '../connection/connection.service';
// import * as MetaCoin from '../../build/contracts/MetaCoin.json';

// @Injectable()
// export class MetacoinService {
//   private metacoinContract: Contract;

//   constructor(private readonly connectionService: ConnectionService,
//               private readonly configService: ConfigService) {
//     this.metacoinContract = this.getMetacoinContract();
//   }

//   async getBalance(account: string, eth?: boolean): Promise<string> {
//     try {
//       const balance = eth ?
//         await this.metacoinContract.getBalanceInEth(account) :
//         await this.metacoinContract.getBalance(account);
//       return balance.toString();
//     } catch (error) {
//       throw new Error('Unable to check account balance');
//     }
//   }

//   sendSignedTransaction(tx: string): Promise<void> {
//     return this.metacoinContract.sendTransaction(tx)
//       .catch(() => {
//         throw new Error('Unable to send signed transaction');
//       });
//   }

//   private getMetacoinContract(): Contract {
//     try {
//       const metacoinAddress = this.configService.get('METACOIN_ADDRESS');
//       const metacoinAbi = MetaCoin.abi;
//       return this.connectionService.launchToContract(metacoinAddress, metacoinAbi);
//     } catch (error) {
//       throw new Error('Unable to connect to MetaCoin contract');
//     }
//   }
// }