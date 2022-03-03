import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    const updated = await this.booksService.update(+id, updateBookDto);
    if (updated) {
      return {
        statusCode: 200,
        message: 'Updated'
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.booksService.remove(+id);
    if (deleted) {
      return {
        statusCode: 200,
        message: 'Deleted'
      };
    }
  }
}
