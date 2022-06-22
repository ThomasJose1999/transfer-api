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
    // private transferContract: Contract;
    
    async contructor(connectionService: ConnectionService) {
        // this.transferContract = this.getTransferContract();
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
            // console.log(signer);
            let value = ethers.utils.parseEther(_value);
            let con = new Contract(contractAddress, contractAbi, signer);
            let address1 = await ethers.utils.getAddress(_address);
            // console.log(address1,value, "address and value");
            let overrides = {

                // The maximum units of gas for the transaction to use
                gasLimit: 90000,
            
                // The price (in wei) per unit of gas
                gasPrice: ethers.utils.parseUnits('9.0', 'gwei'),
            
        
            
            };
            let tx = await con.sendMoney(address1, value, overrides);
            console.log(tx.hash);
            return "Transfer was successful";
        } catch(error){
            throw new Error('Unable to Transact');
        }
    }

    


}


