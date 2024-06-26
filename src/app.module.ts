import { Logger, Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { CategoryModule } from './category/category.module'
import { AuthModule } from './auth/auth.module'
import { TransactionModule } from './transaction/transaction.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { join } from 'path'
import { DevtoolsModule } from '@nestjs/devtools-integration'
import * as process from 'node:process'

@Module({
  imports: [
    UserModule,
    CategoryModule,
    AuthModule,
    TransactionModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: false,
        logger: 'advanced-console',
        entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    console.log(__dirname)
  }
}
