import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableUser1647315338342 implements MigrationInterface {
    name = 'CreateTableUser1647315338342'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(50) NOT NULL, \`password\` text NOT NULL, \`name\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` DROP FOREIGN KEY \`FK_9749139ab1fb4791fa186082516\``);
        await queryRunner.query(`ALTER TABLE \`book_loan\` CHANGE \`bookId\` \`bookId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` ADD CONSTRAINT \`FK_9749139ab1fb4791fa186082516\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`book_loan\` DROP FOREIGN KEY \`FK_9749139ab1fb4791fa186082516\``);
        await queryRunner.query(`ALTER TABLE \`book_loan\` CHANGE \`bookId\` \`bookId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`book_loan\` ADD CONSTRAINT \`FK_9749139ab1fb4791fa186082516\` FOREIGN KEY (\`bookId\`) REFERENCES \`books\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
