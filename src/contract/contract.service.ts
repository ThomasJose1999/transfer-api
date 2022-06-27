import { Injectable } from "@nestjs/common";
import { contractAddress, contractAbi } from '../../config';
var Web3 = require('web3');
let secret = require("../../secret.json");

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

    async sendTransaction(_signer_private_key:string,_address:string, _value: string): Promise<any> {
        
        
        try{
            const web3 = new Web3(new Web3.providers.HttpProvider(secret.uri, { name: 'binance', chainId: 97}));
            const contractInstance = new web3.eth.Contract(contractAbi, contractAddress);
            let value = web3.utils.toWei(_value, 'ether');
            
            let encodedData = await contractInstance.methods.sendMoney(_address,value).encodeABI()
            var tx = {
                from : _address,
                to : contractAddress,
                data : encodedData,
                gas : 100000
            }
            const signPromise = await web3.eth.accounts.signTransaction(tx, _signer_private_key);
            const sentTx = await web3.eth.sendSignedTransaction(signPromise.raw || signPromise.rawTransaction);
            console.log("transaction successful")
            return {success:true, txHash: sentTx.transactionHash}
            
        } catch(error){
            console.log(error)
            return {success: false}
        }
    }

    


}


