import { Controller, Get, Post, Body, Param, Delete, Put, UseFilters, ParseIntPipe } from '@nestjs/common';
import { ValidationPipe } from 'src/common/pipes/validation.pipe';
// import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller({
  version: '1',
  path: 'books'
})
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
  // create(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
      return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  // @UseFilters(HttpExceptionFilter)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findOne(id);
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
