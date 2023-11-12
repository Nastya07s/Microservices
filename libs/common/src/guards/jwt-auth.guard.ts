import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, map, tap } from 'rxjs';
import { AUTH_SERVICE } from '../constants';

export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const jwt = context.switchToHttp().getRequest().cookies?.Authentication;
    console.log('jwt: ', jwt);
    if (!jwt) {
      return false;
    }

    console.log('JwtAuthGuard');
    return this.authClient
      .send('authenticate', {
        Authentication: jwt,
      })
      .pipe(
        map((result) => {
          console.log('result: ', result);
          // Handle the authentication result
          if (result) {
            // Authentication succeeded
            return true;
          } else {
            // Authentication failed
            return false;
          }
        }),
      );
  }
}
