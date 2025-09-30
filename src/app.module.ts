import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { User } from './users/users.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      // если NODE_ENV не задан, используем .env
      envFilePath: process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : '.env',
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT || 5432),
      username: process.env.POSTGRES_USER || 'postgres',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'test_db',
      models: [User],          // список моделей (для auto sync)
      autoLoadModels: true,
      synchronize: true,       // dev only — создаёт таблицы автоматически
      // logging: false,
    }),
    UsersModule,
  ],
})
export class AppModule {}
