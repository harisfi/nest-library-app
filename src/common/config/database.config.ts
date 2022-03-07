import { registerAs } from "@nestjs/config";
import { Book } from "src/books/entities/book.entity";

export default registerAs('database', () => ({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  type: process.env.DATABASE_TYPE,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  entities: [Book]
}))