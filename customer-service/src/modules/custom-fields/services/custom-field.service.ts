import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomField } from '../entities/custom-field.entity';
import { CreateCustomFieldDto } from '../dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from '../dto/update-custom-field.dto';

@Injectable()
export class CustomFieldService {
  constructor(
    @InjectRepository(CustomField)
    private customFieldRepository: Repository<CustomField>,
  ) {}

  async create(createCustomFieldDto: CreateCustomFieldDto): Promise<CustomField> {
    const customField = this.customFieldRepository.create(createCustomFieldDto);
    return this.customFieldRepository.save(customField);
  }

  async findAll(): Promise<CustomField[]> {
    return this.customFieldRepository.find();
  }

  async findByCustomer(customerId: string): Promise<CustomField[]> {
    return this.customFieldRepository.find({
      where: { customerId },
    });
  }

  async findByKey(customerId: string, key: string): Promise<CustomField | null> {
    return this.customFieldRepository.findOne({
      where: { customerId, key },
    });
  }

  async findOne(id: string): Promise<CustomField> {
    const customField = await this.customFieldRepository.findOne({
      where: { id },
    });
    
    if (!customField) {
      throw new NotFoundException(`Custom field with ID ${id} not found`);
    }
    
    return customField;
  }

  async update(id: string, updateCustomFieldDto: UpdateCustomFieldDto): Promise<CustomField> {
    const customField = await this.findOne(id);
    
    // Update custom field data
    await this.customFieldRepository.update(id, updateCustomFieldDto);
    
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const customField = await this.findOne(id);
    await this.customFieldRepository.remove(customField);
  }

  async removeByCustomer(customerId: string): Promise<void> {
    const customFields = await this.findByCustomer(customerId);
    await this.customFieldRepository.remove(customFields);
  }
}