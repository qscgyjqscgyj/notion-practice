import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('request.cookies!!!!!!!!', request.cookies);
    console.log('request.isAuthenticated()!!!!!!!!', request.isAuthenticated());
    return request.isAuthenticated();
  }
}
