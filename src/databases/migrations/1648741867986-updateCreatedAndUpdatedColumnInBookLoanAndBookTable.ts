import {MigrationInterface, QueryRunner} from "typeorm";

export class updateCreatedAndUpdatedColumnInBookLoanAndBookTable1648741867986 implements MigrationInterface {
    name = 'updateCreatedAndUpdatedColumnInBookLoanAndBookTable1648741867986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`book_loan\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`book_loan\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` ADD \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` ADD \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` DROP FOREIGN KEY \`FK_9749139ab1fb4791fa186082516\``);
        await queryRunner.query(`ALTER TABLE \`book_loan\` CHANGE \`bookId\` \`bookId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` ADD CONSTRAINT \`FK_9749139ab1fb4791fa186082516\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_loan\` DROP FOREIGN KEY \`FK_9749139ab1fb4791fa186082516\``);
        await queryRunner.query(`ALTER TABLE \`book_loan\` CHANGE \`bookId\` \`bookId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` ADD CONSTRAINT \`FK_9749139ab1fb4791fa186082516\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`book_loan\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`books\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`book_loan\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`books\` ADD \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

}
