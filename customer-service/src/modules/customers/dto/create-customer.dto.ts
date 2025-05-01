import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomerStatus } from '../entities/customer.entity';
import { CreateAddressDto } from '../../addresses/dto/create-address.dto';
import { CreateCustomFieldDto } from '../../custom-fields/dto/create-custom-field.dto';

export class CreateCustomerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsUUID()
  @IsOptional()
  accountId?: string;

  @IsEnum(CustomerStatus)
  @IsOptional()
  status?: CustomerStatus = CustomerStatus.LEAD;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: string[];

  @IsObject()
  @IsOptional()
  preferences?: Record<string, any>;

  @IsString()
  @IsOptional()
  source?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAddressDto)
  @IsOptional()
  addresses?: CreateAddressDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCustomFieldDto)
  @IsOptional()
  customFields?: CreateCustomFieldDto[];
}