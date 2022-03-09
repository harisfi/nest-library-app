import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Book } from "src/books/entities/book.entity";
import databaseConfig from "src/common/config/database.config";
import { BookSeedService } from "./book.seed.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const options = configService.get('database');
        return options;
      },
      inject: [ConfigService]
    }),
    TypeOrmModule.forFeature([Book])
  ],
  providers: [BookSeedService]
})
export class SeedModule {}