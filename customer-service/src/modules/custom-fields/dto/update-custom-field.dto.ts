import { IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCustomFieldDto {
  @IsUUID()
  @IsOptional()
  id?: string;

  @IsUUID()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsOptional()
  key?: string;

  @IsObject()
  @IsOptional()
  value?: Record<string, any>;
}