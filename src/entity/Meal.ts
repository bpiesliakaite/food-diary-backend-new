import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import BaseEntity from './base/BaseEntity';
import User from './User';
import UserFoodRecordEntry from './UserFoodRecordEntry';
import UserMealRecordEntry from './UserMealRecordEntry';

@Entity()
class Meal extends BaseEntity {
    @Column()
    name: string;

    @Column()
    info: string;

    @OneToMany(() => UserMealRecordEntry, 'meal', { cascade: true })
    foodItems: UserMealRecordEntry[];

    @OneToMany(() => UserFoodRecordEntry, 'userMealRecord')
    userFoodRecordEntries: UserFoodRecordEntry;

    @ManyToOne(() => User)
    user: User;

    @Column({ nullable: false })
    userId: number;
}

export default Meal;