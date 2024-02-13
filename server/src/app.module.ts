import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { CatalogueModule } from './catalogue/catalogue.module';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { CatalogueService } from './catalogue/catalogue.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
    }),
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    AuthModule,
    CatalogueModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, CatalogueService],
})
export class AppModule {}
