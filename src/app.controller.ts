import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async fetchUsers() {
    const users = await this.appService.fetchUsers();
    return users; // Return the users to the client
  }
  // getHello() {
  //   return this.appService.getHello();
  // }
}
