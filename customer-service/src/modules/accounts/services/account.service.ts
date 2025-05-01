import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';
import { AddressService } from '../../addresses/services/address.service';
import { EntityType } from '../../addresses/entities/address.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private addressService: AddressService,
  ) {}

  async create(createAccountDto: CreateAccountDto): Promise<Account> {
    const { addresses, ...accountData } = createAccountDto;
    
    // Create the account
    const account = this.accountRepository.create(accountData);
    const savedAccount = await this.accountRepository.save(account);
    
    // Create addresses if provided
    if (addresses && addresses.length > 0) {
      for (const addressDto of addresses) {
        await this.addressService.create({
          ...addressDto,
          entityType: EntityType.ACCOUNT,
          entityId: savedAccount.id,
        });
      }
    }
    
    return this.findOne(savedAccount.id);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find({
      relations: ['customers', 'addresses'],
    });
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id },
      relations: ['customers', 'addresses'],
    });
    
    if (!account) {
      throw new NotFoundException(`Account with ID ${id} not found`);
    }
    
    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto): Promise<Account> {
    const { addresses, ...accountData } = updateAccountDto;
    
    // Check if account exists
    const account = await this.findOne(id);
    
    // Update account data
    await this.accountRepository.update(id, accountData);
    
    // Update addresses if provided
    if (addresses && addresses.length > 0) {
      for (const addressDto of addresses) {
        if (addressDto.id) {
          await this.addressService.update(addressDto.id, addressDto);
        } else {
          await this.addressService.create({
            ...addressDto,
            entityType: EntityType.ACCOUNT,
            entityId: id,
          });
        }
      }
    }
    
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const account = await this.findOne(id);
    await this.accountRepository.remove(account);
  }
}