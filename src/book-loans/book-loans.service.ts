import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Connection, Repository } from 'typeorm';
import { CreateBookLoanDto } from './dto/create-book-loan.dto';
import { UpdateBookLoanDto } from './dto/update-book-loan.dto';
import { BookLoan } from './entities/book-loan.entity';

@Injectable()
export class BookLoansService {
  constructor(
    @InjectRepository(BookLoan)
    private bookLoanRepository: Repository<BookLoan>,
    private connection: Connection,
  ) {}

  // create(createBookLoanDto: CreateBookLoanDto) {
  //   const bookLoan = this.bookLoanRepository.create(createBookLoanDto);
  //   return this.bookLoanRepository.save(bookLoan);
  // }

  findAll(): Promise<BookLoan[]> {
    return this.bookLoanRepository.createQueryBuilder('book_loan')
      .select(['book_loan', 'book.id', 'book.title'])
      .leftJoin('book_loan.book', 'book')
      .getMany();
  }

  async findOne(id: number): Promise<BookLoan> {
    const bookLoan = await this.bookLoanRepository.createQueryBuilder('book_loan')
      .where({ id })
      .select(['book_loan', 'book.id', 'book.title'])
      .leftJoin('book_loan.book', 'book')
      .getOne();
    if (!bookLoan) {
      throw new NotFoundException();
    }

    return bookLoan;
  }

  async update(id: number, updateBookLoanDto: UpdateBookLoanDto): Promise<boolean> {
    if (!Object.keys(updateBookLoanDto).length) {
      throw new BadRequestException();
    }

    const bookLoan = await this.bookLoanRepository.update(id, updateBookLoanDto);
    if (!bookLoan.affected) {
      throw new NotFoundException();
    }

    return true;
  }

  async remove(id: number): Promise<boolean> {
    const bookLoan = await this.bookLoanRepository.delete(id);
    if (!bookLoan.affected) {
      throw new NotFoundException();
    }

    return true;
  }

  async loan(createBookLoanDto: CreateBookLoanDto) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const books = await queryRunner.manager.count(Book, {
        where: {
          id: createBookLoanDto.book,
        },
      });

      if (books <= 0) {
        throw new NotFoundException('Book is not found');
      }

      const loans = await queryRunner.manager.count(BookLoan, {
        where: {
          book: {
            id: createBookLoanDto.book,
          },
          isStillBorrowed: true,
        },
      });

      if (loans >= 1) {
        throw new BadRequestException('Book already borrowed');
      }

      createBookLoanDto.isStillBorrowed = true;
      const bookLoan = queryRunner.manager.create(BookLoan, createBookLoanDto);
      const ret = queryRunner.manager.save(bookLoan);

      await queryRunner.commitTransaction();

      return ret;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      return error.response;
    } finally {
      await queryRunner.release();
    }
  }
}
