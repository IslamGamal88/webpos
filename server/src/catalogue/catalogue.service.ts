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
            'items',
            'GET',
            { current: 1, lang: 'EN', rowCount: 100 },
            authToken,
            secret,
          ),
        },
      }),
    ).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error', error.message);
      }
      console.log(error.config);
      throw new Error('Error fetching items');
    });
    return responseData;
  }
}
