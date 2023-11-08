import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../src/users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetUserDto } from '../src/users/dto/get-user.dto';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => request?.cookies?.Authentication]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: GetUserDto) {
    return this.usersService.getUser(userId);
  }
}
