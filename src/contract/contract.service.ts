import { Injectable } from "@nestjs/common";
import { Contract } from "ethers";
const { ethers } = require("hardhat");
import Web3 from "web3";
import Web3Modal from 'web3modal'
// import { ConfigService } from '@nestjs/config';
import { ConnectionService } from '../connection/connection.service';
import { contractAddress, contractAbi } from '../../config';
let secret = require("../../secret.json");
// import transfer from '../../artifacts/contracts/transfer.sol/transfer.json';

// import * as tranfer from '../../artifacts/contracts/transfer.sol/transfer.json';

@Injectable()
export class ContractServices {
    private transferContract: Contract;
    
    async contructor(connectionService: ConnectionService) {
        // this.transferContract = this.getTransferContract();
        console.log("Hello There! ")
        this.transferContract = await connectionService.launchToContract(contractAddress,contractAbi);
        // try {
            
        //     const provider = new ethers.providers.JsonRpcProvider("https://speedy-nodes-nyc.moralis.io/509a6df89113f86bf435b88b/bsc/testnet");
        //     const signer = provider.getSigner();

        //     this.transferContract = new ethers.Contract(contractAddress, contractAbi, signer);
        //     console.log(this.transferContract,"transfercontract constructor ###################")
        //     // return connectionService.launchToContract(TransferContractAddress, TransferContractAbi);
        //   } catch (error) {
        //     throw new Error('Unable to connect to transfer contract');
        //   }
    }

    async getBalance(): Promise<{}> {
        try {

            const provider = new ethers.providers.JsonRpcProvider(secret.uri, { name: 'binance', chainId: 97});
            // const signer = provider.getSigner("0x2546BcD3c84621e976D8185a91A922aE77ECEc30");
            let con = new Contract(contractAddress, contractAbi, provider);           
            const balance = await con.balanceOfContract();
            return { balance : balance.toString() };
        } catch (error) {
          console.log(error);
          throw new Error('Unable to check account balance');
        }
      }

      


    async sendTransaction(_signer:string,_address:string, _value: string): Promise<string> {
        try{
            const provider = new ethers.providers.JsonRpcProvider(secret.uri, { name: 'binance', chainId: 97});
            const signer = provider.getSigner(_signer);
            let value = parseInt(_value);
            let con = new Contract(contractAddress, contractAbi, signer);
            let address1 = await ethers.utils.getAddress(_address);
            console.log(address1,value, "address and value");
            await con.sendMoney(address1, value);
            return "Transfer was successful";
        } catch(error){
            
            throw new Error('Unable to Transact');
        }
    }

    


}


