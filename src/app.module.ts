import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { BookLoansModule } from './book-loans/book-loans.module';
import configuration from './common/config/configuration';
import databaseConfig from './common/config/database.config';
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { logger } from './common/middlewares/logger-fn.middleware';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration, databaseConfig],
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
    BooksModule,
    BookLoansModule,
    UsersModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('books');
    consumer.apply(logger).forRoutes('books');
  }
}
