import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Public } from '../decorators/public.decorator';
import { AuthService } from 'src/modules/auth/auth.service';
import { ACCESS_TOKEN } from '../utils/env';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private refector: Reflector,
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.refector.get(Public, context.getHandler());
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();

    const token = this.getTokenFromHeaders(request);

    try {
      const { username, user_id, role } = this.jwtService.verify(token, {
        secret: ACCESS_TOKEN,
      });

      return (async () => {
        const user = await this.userModel.findById(user_id);
        if (!user) throw new UnauthorizedException();
        request.user = { username, user_id, role };
        return true;
      })();
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  private getTokenFromHeaders(request: Request) {
    const token = request?.headers?.authorization?.split(' ')?.[1];

    if (!token) throw new UnauthorizedException();
    return token;
  }
}
