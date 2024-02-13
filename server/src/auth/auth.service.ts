import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.post('/generateToken', {
        username,
        password,
      }),
    );
    await this.cacheManager.set(
      'token',
      data.token,
      // valid for 24hours from now in milliseconds
      24 * 60 * 60 * 1000,
    );
    return data;
  }
}
