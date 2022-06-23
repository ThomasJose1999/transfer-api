import { Module } from '@nestjs/common';

import { ContractController } from './contract.controller';
import { ContractServices } from './contract.service';

@Module({
  // imports: [
  //   ConnectionModule,
  // ],
  controllers: [ContractController],
  providers: [ContractServices]
})
export class ContractModule {}