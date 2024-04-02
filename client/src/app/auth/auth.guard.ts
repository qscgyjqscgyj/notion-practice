import { Injectable, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ROUTES } from 'src/app/app.constants';

class BaseAuthGuard {
  authService = inject(AuthService);
  router = inject(Router);

  user = computed(() => this.authService.user());
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationRequiredGuard extends BaseAuthGuard {
  async canActivate(): Promise<boolean> {
    if (!this.user()) {
      this.router.navigate([ROUTES.AUTH.LOGIN]);
      return false;
    }

    return true;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AlreadyAuthenticatedGuard extends BaseAuthGuard {
  async canActivate(): Promise<boolean> {
    if (this.user()) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
