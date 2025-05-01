import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';
import { CreateCustomerDto } from '../dto/create-customer.dto';
import { UpdateCustomerDto } from '../dto/update-customer.dto';
import { AddressService } from '../../addresses/services/address.service';
import { CustomFieldService } from '../../custom-fields/services/custom-field.service';
import { EntityType } from '../../addresses/entities/address.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    private addressService: AddressService,
    private customFieldService: CustomFieldService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { addresses, customFields, ...customerData } = createCustomerDto;
    
    // Create the customer
    const customer = this.customerRepository.create(customerData);
    const savedCustomer = await this.customerRepository.save(customer);
    
    // Create addresses if provided
    if (addresses && addresses.length > 0) {
      for (const addressDto of addresses) {
        await this.addressService.create({
          ...addressDto,
          entityType: EntityType.CUSTOMER,
          entityId: savedCustomer.id,
        });
      }
    }
    
    // Create custom fields if provided
    if (customFields && customFields.length > 0) {
      for (const fieldDto of customFields) {
        await this.customFieldService.create({
          ...fieldDto,
          customerId: savedCustomer.id,
        });
      }
    }
    
    return this.findOne(savedCustomer.id);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find({
      relations: ['account', 'segments', 'addresses', 'customFields'],
    });
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: ['account', 'segments', 'addresses', 'customFields'],
    });
    
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    
    return customer;
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const { addresses, customFields, ...customerData } = updateCustomerDto;
    
    // Check if customer exists
    const customer = await this.findOne(id);
    
    // Update customer data
    await this.customerRepository.update(id, customerData);
    
    // Update addresses if provided
    if (addresses && addresses.length > 0) {
      for (const addressDto of addresses) {
        if (addressDto.id) {
          await this.addressService.update(addressDto.id, addressDto);
        } else {
          await this.addressService.create({
            ...addressDto,
            entityType: EntityType.CUSTOMER,
            entityId: id,
          });
        }
      }
    }
    
    // Update custom fields if provided
    if (customFields && customFields.length > 0) {
      for (const fieldDto of customFields) {
        if (fieldDto.id) {
          await this.customFieldService.update(fieldDto.id, fieldDto);
        } else {
          await this.customFieldService.create({
            ...fieldDto,
            customerId: id,
          });
        }
      }
    }
    
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
  }
}