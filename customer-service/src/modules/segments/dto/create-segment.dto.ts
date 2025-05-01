import { IsOptional, IsString, IsObject, IsArray, IsUUID } from 'class-validator';

export class CreateSegmentDto {
  @IsString()
  name: string;

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