import { Entity, Column, } from 'typeorm';
import BaseEntity from './base/BaseEntity';

@Entity()
class Meal extends BaseEntity {
    @Column()
    name: string;

    @Column()
    info: string;
}

export default Meal;