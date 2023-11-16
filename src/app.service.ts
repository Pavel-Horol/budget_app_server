import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'How the fuck does it work?';
  }
  getProfile(): string {
    return JSON.stringify({name: "Pasha", age: 18})
  }
}
