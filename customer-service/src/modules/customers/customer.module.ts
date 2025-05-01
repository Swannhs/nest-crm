import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { Customer } from './entities/customer.entity';
import { AddressModule } from '../addresses/address.module';
import { CustomFieldModule } from '../custom-fields/custom-field.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]),
    AddressModule,
    CustomFieldModule,
  ],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}