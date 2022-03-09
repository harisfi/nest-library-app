import { Book } from "src/books/entities/book.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'book_loan' })
export class BookLoan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  borrower: string;

  @Column()
  isStillBorrowed: boolean;

  @ManyToOne(() => Book)
  @JoinColumn()
  book: Book;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
  })
  created_at: Date;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)'
  })
  updated_at: Date;
}
