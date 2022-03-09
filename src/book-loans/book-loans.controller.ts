import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { BookLoansService } from './book-loans.service';
import { CreateBookLoanDto } from './dto/create-book-loan.dto';
import { UpdateBookLoanDto } from './dto/update-book-loan.dto';

@Controller({
  version: '1',
  path: 'book-loans'
})
export class BookLoansController {
  constructor(private readonly bookLoansService: BookLoansService) {}

  @Post()
  create(@Body() createBookLoanDto: CreateBookLoanDto) {
    createBookLoanDto.isStillBorrowed = true;
    return this.bookLoansService.create(createBookLoanDto);
  }

  @Get()
  findAll() {
    return this.bookLoansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookLoansService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBookLoanDto: UpdateBookLoanDto) {
    const updated = await this.bookLoansService.update(+id, updateBookLoanDto);
    if (updated) {
      return {
        statusCode: 200,
        message: 'Updated'
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.bookLoansService.remove(+id);
    if (deleted) {
      return {
        statusCode: 200,
        message: 'Deleted'
      };
    }
  }
}
