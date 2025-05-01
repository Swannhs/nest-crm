import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { EntityType, AddressType } from '../entities/address.entity';

export class CreateAddressDto {
  @IsEnum(EntityType)
  entityType: EntityType;

  @IsUUID()
  @IsOptional()
  entityId?: string;

  @IsEnum(AddressType)
  @IsOptional()
  type?: AddressType = AddressType.OTHER;

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