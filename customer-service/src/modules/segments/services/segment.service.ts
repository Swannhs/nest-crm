import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Segment } from '../entities/segment.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { CreateSegmentDto } from '../dto/create-segment.dto';
import { UpdateSegmentDto } from '../dto/update-segment.dto';

@Injectable()
export class SegmentService {
  constructor(
    @InjectRepository(Segment)
    private segmentRepository: Repository<Segment>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async create(createSegmentDto: CreateSegmentDto): Promise<Segment> {
    const { customerIds, ...segmentData } = createSegmentDto;
    
    // Create the segment
    const segment = this.segmentRepository.create(segmentData);
    const savedSegment = await this.segmentRepository.save(segment);
    
    // Associate customers if provided
    if (customerIds && customerIds.length > 0) {
      await this.addCustomersToSegment(savedSegment.id, customerIds);
    }
    
    return this.findOne(savedSegment.id);
  }

  async findAll(): Promise<Segment[]> {
    return this.segmentRepository.find({
      relations: ['customers'],
    });
  }

  async findOne(id: string): Promise<Segment> {
    const segment = await this.segmentRepository.findOne({
      where: { id },
      relations: ['customers'],
    });
    
    if (!segment) {
      throw new NotFoundException(`Segment with ID ${id} not found`);
    }
    
    return segment;
  }

  async update(id: string, updateSegmentDto: UpdateSegmentDto): Promise<Segment> {
    const { customerIds, ...segmentData } = updateSegmentDto;
    
    // Check if segment exists
    const segment = await this.findOne(id);
    
    // Update segment data
    await this.segmentRepository.update(id, segmentData);
    
    // Update customer associations if provided
    if (customerIds && customerIds.length > 0) {
      // Clear existing associations and add new ones
      segment.customers = [];
      await this.segmentRepository.save(segment);
      await this.addCustomersToSegment(id, customerIds);
    }
    
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const segment = await this.findOne(id);
    await this.segmentRepository.remove(segment);
  }

  async addCustomersToSegment(segmentId: string, customerIds: string[]): Promise<void> {
    const segment = await this.findOne(segmentId);
    const customers = await this.customerRepository.findByIds(customerIds);
    
    if (!segment.customers) {
      segment.customers = [];
    }
    
    segment.customers = [...segment.customers, ...customers];
    await this.segmentRepository.save(segment);
  }

  async removeCustomersFromSegment(segmentId: string, customerIds: string[]): Promise<void> {
    const segment = await this.findOne(segmentId);
    
    if (segment.customers) {
      segment.customers = segment.customers.filter(
        customer => !customerIds.includes(customer.id)
      );
      await this.segmentRepository.save(segment);
    }
  }
}