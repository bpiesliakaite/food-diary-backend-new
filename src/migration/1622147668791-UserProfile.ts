import {MigrationInterface, QueryRunner} from "typeorm";

export class UserProfile1622147668791 implements MigrationInterface {
    name = 'UserProfile1622147668791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD `firstName` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `lastName` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `gender` tinyint NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `birthDate` datetime NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `weight` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `height` int NULL");
        await queryRunner.query("ALTER TABLE `user` ADD `physicalTraining` varchar(255) NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `physicalTraining`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `height`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `weight`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `birthDate`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `gender`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `lastName`");
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `firstName`");
    }

}
