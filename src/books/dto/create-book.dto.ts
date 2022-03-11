import { IsString, MaxLength } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @MaxLength(10)
  title: string;
  description: string;
  author: string;
  publisher: string;
}
