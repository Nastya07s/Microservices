import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from '../src/users/users.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { GetUserDto } from '../src/users/dto/get-user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([(request: any) => request?.cookies?.Authentication || request?.Authentication]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: GetUserDto) {
    return this.usersService.getUser(userId);
  }
}
