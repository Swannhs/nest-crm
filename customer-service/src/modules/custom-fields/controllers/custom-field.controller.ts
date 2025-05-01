import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { CustomFieldService } from '../services/custom-field.service';
import { CreateCustomFieldDto } from '../dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from '../dto/update-custom-field.dto';
import { CustomField } from '../entities/custom-field.entity';

@Controller('custom-fields')
export class CustomFieldController {
  constructor(private readonly customFieldService: CustomFieldService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createCustomFieldDto: CreateCustomFieldDto): Promise<CustomField> {
    return this.customFieldService.create(createCustomFieldDto);
  }

  @Get()
  async findAll(
    @Query('customerId') customerId?: string,
    @Query('key') key?: string,
  ): Promise<CustomField[] | CustomField> {
    if (customerId && key) {
      return this.customFieldService.findByKey(customerId, key);
    }
    if (customerId) {
      return this.customFieldService.findByCustomer(customerId);
    }
    return this.customFieldService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CustomField> {
    return this.customFieldService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCustomFieldDto: UpdateCustomFieldDto,
  ): Promise<CustomField> {
    return this.customFieldService.update(id, updateCustomFieldDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.customFieldService.remove(id);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeByCustomer(
    @Query('customerId') customerId: string,
  ): Promise<void> {
    if (!customerId) {
      throw new Error('customerId is required');
    }
    return this.customFieldService.removeByCustomer(customerId);
  }
}