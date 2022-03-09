import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/books/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BookSeedService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

  async seed(): Promise<void> {
    const book: Book = this.bookRepository.create({
      title: 'Hujan',
      author: 'Tere Liye',
      publisher: 'Gramedia',
      description: 'This is description'
    });

    await this.bookRepository.save(book);
  }
}
