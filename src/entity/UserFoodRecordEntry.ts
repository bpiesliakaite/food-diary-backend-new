import { Entity, Column, ManyToOne } from 'typeorm';
import BaseEntity from './base/BaseEntity';
import { Fooddata } from './Fooddata';
import Meal from './Meal';
import UserFoodRecord from './UserFoodRecord';

@Entity()
class UserFoodRecordEntry extends BaseEntity {
    @Column({ type: 'double' })
    amount: number;

    @ManyToOne(() => UserFoodRecord, userFoodRecord => userFoodRecord.userFoodRecordEntries)
    userFoodRecord: UserFoodRecord;

    @ManyToOne(() => Fooddata)
    foodData: Fooddata;

    @Column({ nullable: true })
    foodDataId: number;

    @ManyToOne(() => Meal, meal => meal.userFoodRecordEntries)
    userMealRecord: Meal;

    @Column({ nullable: true })
    userMealRecordId: number;
}

export default UserFoodRecordEntry;