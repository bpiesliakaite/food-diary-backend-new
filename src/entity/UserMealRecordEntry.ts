import { Entity, Column, ManyToOne, } from 'typeorm';
import BaseEntity from './base/BaseEntity';
import Fooddata from './Fooddata';
import Meal from './Meal';

@Entity()
class UserMealRecordEntry extends BaseEntity {
    @Column({ type: 'double' })
    amount: number;

    @ManyToOne(() => Meal)
    meal: Meal;

    @ManyToOne(() => Fooddata)
    foodData: Fooddata;

    @Column({ nullable: false })
    foodDataId: number;
}

export default UserMealRecordEntry;