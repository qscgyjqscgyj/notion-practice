import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ROUTES } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    this.authService.isLoggedIn();
    const user = this.authService.user;

    console.log('user!!!!!!', user);

    if (user === null) {
      this.router.navigate([ROUTES.AUTH.LOGIN]);
      return false;
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthRedirectGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    this.authService.isLoggedIn();
    const user = this.authService.user;

    console.log('user!!!!!!', user);

    if (!!user) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
