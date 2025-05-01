import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomFieldController } from './controllers/custom-field.controller';
import { CustomFieldService } from './services/custom-field.service';
import { CustomField } from './entities/custom-field.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomField]),
  ],
  controllers: [CustomFieldController],
  providers: [CustomFieldService],
  exports: [CustomFieldService],
})
export class CustomFieldModule {}