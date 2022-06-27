import { Injectable } from "@nestjs/common";
import { Contract } from "ethers";
const { ethers } = require("hardhat");
import { contractAddress, contractAbi } from '../../config';
var Web3 = require('web3');
let secret = require("../../secret.json");
var Tx = require('ethereumjs-tx').Transaction;

@Injectable()
export class ContractServices {
    // private transferContract: Contract;
    
    async contructor() {
        // this.transferContract = this.getTransferContract();
    }

    async getBalance(): Promise<{}> {
        try {
            let web3 = new Web3(new Web3.providers.HttpProvider(secret.uri, { name: 'binance', chainId: 97}));
            // web3.eth.getBlockNumber().then(console.log);
            let cont = new web3.eth.Contract(contractAbi, contractAddress);
            let balance = await cont.methods.balanceOfContract().call();
            return { balance : balance.toString() };
        } catch (error) {
          console.log(error);
          throw new Error('Unable to check account balance');
        }
      }

    async sendTransaction(_signer_private_key:string,_address:string, _value: string): Promise<{}> {
        
        
        try{
            const web3 = new Web3(new Web3.providers.HttpProvider(secret.uri, { name: 'binance', chainId: 97}));
            const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
            let toAddress = await ethers.utils.getAddress(_address);
            console.log(web3.utils.isAddress(toAddress))
            let value = web3.utils.toWei(_value, 'ether');
            console.log(await web3.eth.getGasPrice());
            
            let encodedData = await contractInstance.methods.sendMoney(_address,value).encodeABI()
            var tx = {
                from : _address,
                to : contractAddress,
                data : encodedData,
                gas : 100000
            }
            const signPromise = web3.eth.accounts.signTransaction(tx, _signer_private_key);
            
            signPromise.then((signedTx) => {

                const sentTx = web3.eth.sendSignedTransaction(signedTx.raw || signedTx.rawTransaction);
                sentTx.on("receipt", receipt => {
                //   console.log(receipt);
                });
                sentTx.on("error", err => {
                    console.log(err)
                 
                });
              }).catch((err) => {
                console.log(err)
              });
            
            
              return { success: true }
            
        
            
        } catch(error){
            console.log(error);
            throw new Error('Unable to Transact');
        }
    }

    


}


