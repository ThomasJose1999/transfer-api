import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Contract } from 'ethers';
import { ContractServices } from './contract.service';
// import { IsAddressPipe } from '../common/validation/is-address.pipe';
import { SendMoneyDto } from './dto/post-send-money.dto';
const { ethers } = require("hardhat");



@Controller('contract')
export class ContractController {
  constructor(private readonly contractServices: ContractServices) { }

  @Get('balance')
  getBalance(): Promise<{}> {
    return this.contractServices.getBalance();
  }

  @Post('send-money')
  async sendTransaction(@Body() sendMoney: SendMoneyDto): Promise<string> {
    return this.contractServices.sendTransaction(sendMoney.signer, sendMoney.address, sendMoney.value);
  }
}
