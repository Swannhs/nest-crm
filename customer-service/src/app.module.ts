import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './modules/customers/customer.module';
import { AccountModule } from './modules/accounts/account.module';
import { SegmentModule } from './modules/segments/segment.module';
import { AddressModule } from './modules/addresses/address.module';
import { CustomFieldModule } from './modules/custom-fields/custom-field.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('database'),
    }),
    CustomerModule,
    AccountModule,
    SegmentModule,
    AddressModule,
    CustomFieldModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
