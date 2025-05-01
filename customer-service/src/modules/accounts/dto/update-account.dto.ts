import { IsOptional, IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateAddressDto } from '../../addresses/dto/update-address.dto';

export class UpdateAccountDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsOptional()
  website?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateAddressDto)
  @IsOptional()
  addresses?: UpdateAddressDto[];
}