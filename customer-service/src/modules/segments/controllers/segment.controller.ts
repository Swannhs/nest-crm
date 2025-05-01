import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { SegmentService } from '../services/segment.service';
import { CreateSegmentDto } from '../dto/create-segment.dto';
import { UpdateSegmentDto } from '../dto/update-segment.dto';
import { Segment } from '../entities/segment.entity';

@Controller('segments')
export class SegmentController {
  constructor(private readonly segmentService: SegmentService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createSegmentDto: CreateSegmentDto): Promise<Segment> {
    return this.segmentService.create(createSegmentDto);
  }

  @Get()
  async findAll(): Promise<Segment[]> {
    return this.segmentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Segment> {
    return this.segmentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSegmentDto: UpdateSegmentDto,
  ): Promise<Segment> {
    return this.segmentService.update(id, updateSegmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.segmentService.remove(id);
  }

  @Post(':id/customers')
  async addCustomers(
    @Param('id') id: string,
    @Body() body: { customerIds: string[] },
  ): Promise<void> {
    return this.segmentService.addCustomersToSegment(id, body.customerIds);
  }

  @Delete(':id/customers')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeCustomers(
    @Param('id') id: string,
    @Body() body: { customerIds: string[] },
  ): Promise<void> {
    return this.segmentService.removeCustomersFromSegment(id, body.customerIds);
  }
}