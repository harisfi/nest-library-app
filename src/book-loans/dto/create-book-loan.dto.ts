import { Book } from "src/books/entities/book.entity";

export class CreateBookLoanDto {
  borrower: string;
  isStillBorrowed: boolean;
  book: Book;
}
