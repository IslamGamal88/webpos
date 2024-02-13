import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosHeaderValue } from 'axios';
import { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { generateSignature } from 'src/utils/generateSignature';

@Injectable()
export class CatalogueService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCatalogueItems(): Promise<any> {
    const authToken = (await this.cacheManager.get('token')) as string;
    const secret = await this.configService.get<string>('SECRET_KEY');
    const { data: responseData } = await firstValueFrom(
      this.httpService.get(`/items`, {
        params: { current: 1, lang: 'EN', rowCount: 100 },
        headers: {
          Authorization: authToken as AxiosHeaderValue,
          signature: generateSignature(
            '/items',
            'GET',
            { current: 1, lang: 'EN', rowCount: 100 },
            authToken,
            secret,
          ),
        },
      }),
    );
    return responseData;
  }
}
