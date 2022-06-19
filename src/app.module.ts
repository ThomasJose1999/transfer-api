import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionModule } from './connection/connection.module';
import { ContractModule } from './contract/contract.module';

@Module({
  imports: [ConnectionModule, ContractModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
