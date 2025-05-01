import { IsEmail, IsEnum, IsOptional, IsString, IsUUID, IsArray, ValidateNested, IsObject } from 'class-validator';
import { Type } from 'class-transformer';
import { CustomerStatus } from '../entities/customer.entity';
import { UpdateAddressDto } from '../../addresses/dto/update-address.dto';
import { UpdateCustomFieldDto } from '../../custom-fields/dto/update-custom-field.dto';

export class UpdateCustomerDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsUUID()
  @IsOptional()
  accountId?: string;

  @IsEnum(CustomerStatus)
  @IsOptional()
  status?: CustomerStatus;

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
  @Type(() => UpdateAddressDto)
  @IsOptional()
  addresses?: UpdateAddressDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCustomFieldDto)
  @IsOptional()
  customFields?: UpdateCustomFieldDto[];
}