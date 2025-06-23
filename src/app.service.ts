import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatusServer(): string {
    return 'Server is up and running!';
  }
}
