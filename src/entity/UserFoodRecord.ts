import { Entity, Column, OneToMany, ManyToOne, } from 'typeorm';
import BaseEntity from './base/BaseEntity';
import User from './User';
import UserFoodRecordEntry from './UserFoodRecordEntry';

@Entity()
class UserFoodRecord extends BaseEntity {
    @Column({ name: 'meal_type' })
    mealType: string

    @Column()
    date: Date;

    @ManyToOne(() => User)
    user: User;

    @Column({ nullable: false })
    userId: number;

    @OneToMany(() => UserFoodRecordEntry, userFoodRecordEntry => userFoodRecordEntry.userFoodRecord)
    userFoodRecordEntries!: UserFoodRecordEntry[];
}

export default UserFoodRecord;