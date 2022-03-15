import { registerAs } from "@nestjs/config";
import { BookLoan } from "src/book-loans/entities/book-loan.entity";
import { Book } from "src/books/entities/book.entity";
import { User } from "src/users/entities/user.entity";

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  type: process.env.DATABASE_TYPE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [Book, BookLoan, User]
}))