import { Entity, Column, BeforeInsert, BeforeUpdate } from 'typeorm';
import BaseEntity from './base/BaseEntity';
import hashPassword from '../utils/hashPassword';

export enum PhysicalTraining {
  Average = 'Average',
  High = 'High',
  Low = 'Low'
};

@Entity()
class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  gender: boolean;

  @Column({ nullable: true })
  birthDate: Date;

  @Column({ nullable: true })
  weight: number;

  @Column({ nullable: true })
  height: number;

  @Column({ nullable: true })
  physicalTraining: PhysicalTraining;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword(): void {
    this.password = hashPassword(this.password);
  }
}

export default User;
