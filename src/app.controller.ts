import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './middleware/jwt-auth-guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async fetchUsers() {
    const users = await this.appService.fetchUsers();
    return users; // Return the users to the client
  }
  // getHello() {
  //   return this.appService.getHello();
  // }
}
