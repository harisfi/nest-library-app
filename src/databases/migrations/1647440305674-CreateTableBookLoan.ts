import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableBookLoan1647440305674 implements MigrationInterface {
    name = 'CreateTableBookLoan1647440305674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book_loan\` (\`id\` int NOT NULL AUTO_INCREMENT, \`borrower\` varchar(255) NOT NULL, \`isStillBorrowed\` tinyint NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`bookId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` ADD CONSTRAINT \`FK_9749139ab1fb4791fa186082516\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_loan\` DROP FOREIGN KEY \`FK_9749139ab1fb4791fa186082516\``);
        await queryRunner.query(`DROP TABLE \`book_loan\``);
    }

}
