import { Entity, Column, OneToMany, } from 'typeorm';
import BaseEntity from './base/BaseEntity';
import UserMealRecordEntry from './UserMealRecordEntry';

@Entity()
class Meal extends BaseEntity {
    @Column()
    name: string;

    @Column()
    info: string;

    @OneToMany(() => UserMealRecordEntry, 'meal', { cascade: true })
    foodItems: UserMealRecordEntry[];
}

export default Meal;