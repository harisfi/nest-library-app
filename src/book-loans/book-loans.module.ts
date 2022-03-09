import { Module } from '@nestjs/common';
import { BookLoansService } from './book-loans.service';
import { BookLoansController } from './book-loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookLoan } from './entities/book-loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookLoan])],
  controllers: [BookLoansController],
  providers: [BookLoansService]
})
export class BookLoansModule {}
