import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { getCurrentDateTime } from 'src/utils/getCurrentDateTime';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async login(username: string, password: string): Promise<any> {
    const { data } = await firstValueFrom(
      this.httpService.post(
        `${this.configService.get<string>('API_URL')}/generateToken`,
        {
          username,
          password,
        },
        {
          headers: {
            'X-GIFTLOV-DATE': getCurrentDateTime(),
          },
        },
      ),
    );
    return data;
  }
}
