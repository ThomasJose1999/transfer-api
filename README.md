## contract deployed to: 0xF37ed6b6742De74F473A2dCDF5108e7e4A52DA2D
### chain uri: https://speedy-nodes-nyc.moralis.io/509a6df89113f86bf435b88b/bsc/testnet

## API end-points
* http://localhost:3000/contract/balance     : returns balance of contract as Json ``` {"balance":"100998498000000000"} ``` Note that the balance is in wei .
* http://localhost:3000/contract/send-money  : returns json ``` {
    "success": true
} ```
if the transaction was successfull.


## Keep in mind:
* copy paste your key in ./secret.json
* copy the address of the contract after deployment to config.js
* copy the abi to the config.js

## How to run 
* copy paste your private key of your account in bsc test net to ./secret.json
* run  ```npm install```
* run ``` npm runs start:dev ``` 
* go to http://localhost:3000/contract/balance in your browser to check the contract balance
* send a post request to http://localhost:3000/contract/send-money with req body as  ``` {
    "signerPrivateKey": "private key of your account", 
    "address": " address of the account you want to send the money ",
    "value": "0.0000001"    // example value where "1.0" being one token.
} ```




# Basic Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, a sample script that deploys that contract, and an example of a task implementation, which simply lists the available accounts.

Try running some of the following tasks:

```shell
npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test
npx hardhat node
node scripts/sample-script.js
npx hardhat help
```
