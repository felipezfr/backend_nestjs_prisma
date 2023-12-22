import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly firebase: FirebaseService) { }

  canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();

    const authorization = request.headers.authorization;

    const token = authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException
    }
    console.log(token);

    return this.firebase.verifyToken(token);
  }
}
