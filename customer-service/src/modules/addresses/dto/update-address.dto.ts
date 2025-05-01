import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { EntityType, AddressType } from '../entities/address.entity';

export class UpdateAddressDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsEnum(EntityType)
  @IsOptional()
  entityType?: EntityType;

  @IsUUID()
  @IsOptional()
  entityId?: string;

  @IsEnum(AddressType)
  @IsOptional()
  type?: AddressType;

  @IsString()
  @IsOptional()
  street?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zip?: string;

  @IsString()
  @IsOptional()
  country?: string;
}