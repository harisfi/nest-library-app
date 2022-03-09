import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookLoanDto } from './dto/create-book-loan.dto';
import { UpdateBookLoanDto } from './dto/update-book-loan.dto';
import { BookLoan } from './entities/book-loan.entity';

@Injectable()
export class BookLoansService {
  constructor(
    @InjectRepository(BookLoan)
    private bookLoanRepository: Repository<BookLoan>
  ) {}

  create(createBookLoanDto: CreateBookLoanDto) {
    const bookLoan = this.bookLoanRepository.create(createBookLoanDto);
    return this.bookLoanRepository.save(bookLoan);
  }

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
}
