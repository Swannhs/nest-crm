import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Account } from '../../accounts/entities/account.entity';

export enum EntityType {
  CUSTOMER = 'customer',
  ACCOUNT = 'account',
}

export enum AddressType {
  HOME = 'home',
  BILLING = 'billing',
  SHIPPING = 'shipping',
  WORK = 'work',
  OTHER = 'other',
}

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'entity_type',
    type: 'varchar',
    length: 20,
    nullable: false,
  })
  entityType: EntityType;

  @Column({ name: 'entity_id', type: 'uuid', nullable: false })
  entityId: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    default: AddressType.OTHER,
  })
  type: AddressType;

  @Column({ length: 255, nullable: true })
  street: string;

  @Column({ length: 100, nullable: true })
  city: string;

  @Column({ length: 100, nullable: true })
  state: string;

  @Column({ length: 20, nullable: true })
  zip: string;

  @Column({ length: 100, nullable: true })
  country: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => Customer, customer => customer.addresses, { nullable: true })
  @JoinColumn({ name: 'entity_id' })
  customer: Customer;

  @ManyToOne(() => Account, account => account.addresses, { nullable: true })
  @JoinColumn({ name: 'entity_id' })
  account: Account;
}