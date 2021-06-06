import {MigrationInterface, QueryRunner} from "typeorm";

export class MealUserId1622906562560 implements MigrationInterface {
    name = 'MealUserId1622906562560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `meal` ADD `userId` int NOT NULL");
        await queryRunner.query("ALTER TABLE `meal` ADD CONSTRAINT `FK_419ad998c5e3b37a7cce0f872f5` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `meal` DROP FOREIGN KEY `FK_419ad998c5e3b37a7cce0f872f5`");
        await queryRunner.query("ALTER TABLE `meal` DROP COLUMN `userId`");
    }

}
