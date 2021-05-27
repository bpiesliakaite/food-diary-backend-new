import {MigrationInterface, QueryRunner} from "typeorm";

export class UserFoodRecordWithMealNullable1622064759782 implements MigrationInterface {
    name = 'UserFoodRecordWithMealNullable1622064759782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_food_record_entry` DROP FOREIGN KEY `FK_0565805c74df9aa89abde7eeaed`");
        await queryRunner.query("ALTER TABLE `user_food_record_entry` CHANGE `foodDataId` `foodDataId` int NULL");
        await queryRunner.query("ALTER TABLE `user_food_record_entry` ADD CONSTRAINT `FK_0565805c74df9aa89abde7eeaed` FOREIGN KEY (`foodDataId`) REFERENCES `fooddata`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_food_record_entry` DROP FOREIGN KEY `FK_0565805c74df9aa89abde7eeaed`");
        await queryRunner.query("ALTER TABLE `user_food_record_entry` CHANGE `foodDataId` `foodDataId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `user_food_record_entry` ADD CONSTRAINT `FK_0565805c74df9aa89abde7eeaed` FOREIGN KEY (`foodDataId`) REFERENCES `fooddata`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

}
