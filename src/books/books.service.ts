import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>
  ) {}

  create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto)
    return this.bookRepository.save(book)
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException();
    }

    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto): Promise<boolean> {
    if (!Object.keys(updateBookDto).length) {
      throw new BadRequestException();
    }

    const book = await this.bookRepository.update(id, updateBookDto);
    if (!book.affected) {
      throw new NotFoundException();
    }

    return true;
  }

  async remove(id: number): Promise<boolean> {
    const book = await this.bookRepository.delete(id);
    if (!book.affected) {
      throw new NotFoundException();
    }

    return true;
  }
}
