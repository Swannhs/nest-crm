import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
import { Account } from './entities/account.entity';
import { AddressModule } from '../addresses/address.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    AddressModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}