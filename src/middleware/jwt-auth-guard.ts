// jwt-auth.guard.ts
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token has invalid format');
    }

    try {
      // Verify the token and attach the payload to the request object
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      request['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException('Token is invalid');
    }

    return true; // Allow request to proceed
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    // Extract token after 'Bearer '
    return authHeader.split(' ')[1];
  }
}
