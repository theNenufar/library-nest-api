import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'library',
      autoLoadEntities: true,
      synchronize: true,
    }),
    BooksModule,
    LoansModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}