import { Post, Body, Controller, Res } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService,
    private jwtService: JwtService,
  ) {}

  @Post('register')
  async registerUser(@Body() body: any, @Res() res: Response) {
    const { username, password } = body;
    try {
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: 'Missing username or password' });
      }
      const hashPassword = await bcrypt.hash(password, 10);

      await this.authenticationService.register(username, hashPassword);
      return res.status(200).json({ message: 'Register success' });
    } catch {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  }

  @Post('login')
  async loginUser(@Body() body: any, @Res() res: Response) {
    const { username, password } = body;
    try {
      if (!username || !password) {
        return res
          .status(400)
          .json({ message: 'Missing username or password' });
      }

      const user: any = await this.authenticationService.login(username);
      const hashPassword = await bcrypt.compare(password, user.password);

      if (!hashPassword) {
        return res
          .status(401)
          .json({ message: 'Invalid username or password' });
      }

      const jwt = await this.jwtService.signAsync({ userId: user.id });

      return res.status(200).json({ token: jwt });
    } catch {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  }
}
