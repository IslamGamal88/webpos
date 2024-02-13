import { Module } from '@nestjs/common';
import { CatalogueService } from './catalogue.service';
import { CatalogueController } from './catalogue.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getCurrentDateTime } from 'src/utils/getCurrentDateTime';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: 60000,
        maxRedirects: 5,
        baseURL: configService.get<string>('API_URL'),
        headers: {
          'X-GIFTLOV-DATE': getCurrentDateTime(4),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CatalogueService],
  controllers: [CatalogueController],
})
export class CatalogueModule {}
