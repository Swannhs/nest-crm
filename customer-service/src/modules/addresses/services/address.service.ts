import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from '../entities/address.entity';
import { CreateAddressDto } from '../dto/create-address.dto';
import { UpdateAddressDto } from '../dto/update-address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = this.addressRepository.create(createAddressDto);
    return this.addressRepository.save(address);
  }

  async findAll(): Promise<Address[]> {
    return this.addressRepository.find();
  }

  async findByEntity(entityType: string, entityId: string): Promise<Address[]> {
    return this.addressRepository.find({
      where: {
        entityType,
        entityId,
      },
    });
  }

  async findOne(id: string): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
    });
    
    if (!address) {
      throw new NotFoundException(`Address with ID ${id} not found`);
    }
    
    return address;
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<Address> {
    const address = await this.findOne(id);
    
    // Update address data
    await this.addressRepository.update(id, updateAddressDto);
    
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }

  async removeByEntity(entityType: string, entityId: string): Promise<void> {
    const addresses = await this.findByEntity(entityType, entityId);
    await this.addressRepository.remove(addresses);
  }
}