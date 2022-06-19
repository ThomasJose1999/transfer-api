import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ContractServices } from './contract.service';
// import { IsAddressPipe } from '../common/validation/is-address.pipe';
import { SendMoneyDto } from './dto/post-send-money.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractServices: ContractServices) { }

  @Get('balance')
  getBalance(): Promise<string> {
    return this.contractServices.getBalance();
  }

  @Post('send-money')
  sendCoin(@Body() sendMoney: SendMoneyDto): Promise<string> {
    return this.contractServices.sendTransaction(sendMoney.address, sendMoney.value);
  }
}
