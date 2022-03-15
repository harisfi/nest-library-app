import { BookLoan } from "src/book-loans/entities/book-loan.entity";
import { Book } from "src/books/entities/book.entity";
import databaseConfig from "src/common/config/database.config";
import { User } from "src/users/entities/user.entity";

module.exports = {
  host: databaseConfig().host,
  port: databaseConfig().port,
  type: databaseConfig().type,
  username: databaseConfig().username,
  password: databaseConfig().password,
  database: databaseConfig().database,
  synchronize: false,
  entities: [Book, BookLoan, User],
  migrations: ['src/databases/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/databases/migrations'
  }
}