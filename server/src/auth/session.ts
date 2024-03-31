import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UserData } from 'src/users/entities/user.entity';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: UserData, done: (err: Error, user: UserData) => void) {
    console.log('serializeUser.user!!!!!!!!', user);
    done(null, user);
  }

  deserializeUser(
    payload: string,
    done: (err: Error, payload: string) => void,
  ) {
    console.log('deserializeUser.payload!!!!!!!!', payload);
    done(null, payload);
  }
}
