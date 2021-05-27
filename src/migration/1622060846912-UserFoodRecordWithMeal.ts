import {MigrationInterface, QueryRunner} from "typeorm";

export class UserFoodRecordWithMeal1622060846912 implements MigrationInterface {
    name = 'UserFoodRecordWithMeal1622060846912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_food_record_entry` ADD `userMealRecordId` int NULL");
        await queryRunner.query("ALTER TABLE `user_food_record_entry` ADD CONSTRAINT `FK_e945184342ecd4105545fd74fae` FOREIGN KEY (`userMealRecordId`) REFERENCES `meal`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_food_record_entry` DROP FOREIGN KEY `FK_e945184342ecd4105545fd74fae`");
        await queryRunner.query("ALTER TABLE `user_food_record_entry` DROP COLUMN `userMealRecordId`");
    }

}
