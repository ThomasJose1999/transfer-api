import { Injectable } from "@nestjs/common";
import { Contract } from "ethers";
const { ethers } = require("hardhat");
import { contractAddress, contractAbi } from '../../config';
let secret = require("../../secret.json");

@Injectable()
export class ContractServices {
    // private transferContract: Contract;
    
    async contructor() {
        // this.transferContract = this.getTransferContract();
    }

    async getBalance(): Promise<{}> {
        try {

            const provider = new ethers.providers.JsonRpcProvider(secret.uri, { name: 'binance', chainId: 97});
            let con = new Contract(contractAddress, contractAbi, provider);           
            const balance = await con.balanceOfContract();
            return { balance : balance.toString() };
        } catch (error) {
          console.log(error);
          throw new Error('Unable to check account balance');
        }
      }

    async sendTransaction(_signer_private_key:string,_address:string, _value: string): Promise<{}> {
        try{
            const provider = new ethers.providers.JsonRpcProvider(secret.uri, { name: 'binance', chainId: 97});
            provider.getBlockNumber().then((result) => {
                console.log("Current block number: " + result);
            });
            
            // const signer = provider.getSigner(_signer);
            const signer = new ethers.Wallet(_signer_private_key, provider);  
            let value = ethers.utils.parseEther(_value);
            let con = new Contract(contractAddress, contractAbi, signer);
            let address1 = await ethers.utils.getAddress(_address);
            let tx = await con.sendMoney(address1, value);
            console.log(tx.hash);
            return {status: "success",
                hash: tx.hash    
            };
        } catch(error){
            console.log(error);
            throw new Error('Unable to Transact');
        }
    }

    


}


