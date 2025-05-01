import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { Account } from '../../accounts/entities/account.entity';
import { Segment } from '../../segments/entities/segment.entity';
import { Address } from '../../addresses/entities/address.entity';
import { CustomField } from '../../custom-fields/entities/custom-field.entity';

export enum CustomerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  LEAD = 'lead',
  ARCHIVED = 'archived',
}

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'first_name', length: 100, nullable: false })
  firstName: string;

  @Column({ name: 'last_name', length: 100, nullable: false })
  lastName: string;

  @Column({ length: 255, nullable: false, unique: true })
  email: string;

  @Column({ length: 20, nullable: true })
  phone: string;

  @Column({ name: 'account_id', nullable: true })
  accountId: string;

  @ManyToOne(() => Account, { nullable: true })
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: false,
    default: CustomerStatus.LEAD,
  })
  status: CustomerStatus;

  @Column('varchar', { array: true, nullable: true })
  tags: string[];

  @Column({ type: 'jsonb', nullable: true })
  preferences: Record<string, any>;

  @Column({ name: 'last_interaction_at', type: 'timestamp', nullable: true })
  lastInteractionAt: Date;

  @Column({ length: 50, nullable: true })
  source: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Segment)
  @JoinTable({
    name: 'customer_segments',
    joinColumn: { name: 'customer_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'segment_id', referencedColumnName: 'id' },
  })
  segments: Segment[];

  @OneToMany(() => Address, address => address.customer)
  addresses: Address[];

  @OneToMany(() => CustomField, customField => customField.customer)
  customFields: CustomField[];
}