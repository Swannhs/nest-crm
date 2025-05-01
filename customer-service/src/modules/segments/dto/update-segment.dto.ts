import { IsOptional, IsString, IsObject, IsArray, IsUUID } from 'class-validator';

export class UpdateSegmentDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  @IsOptional()
  criteria?: Record<string, any>;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  customerIds?: string[];
}