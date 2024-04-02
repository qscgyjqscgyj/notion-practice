import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { UserLogin, User, UserSignup } from 'src/app/auth/user.interface';
import { ENV } from 'src/env/env';

interface AuthServiceState {
  user: User | null;
  error: string | null;
  status: 'pending' | 'loading' | 'error' | 'success';
}

const initialState: AuthServiceState = {
  user: null,
  error: null,
  status: 'pending',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);

  state = signal<AuthServiceState>(initialState);

  user = computed(() => this.state().user);
  status = computed(() => this.state().status);
  error = computed(() => this.state().error);

  private changeStatus(status: AuthServiceState['status']) {
    this.state.update((state) => ({
      ...state,
      status,
    }));
  }

  private setUser(
    observableUser: Observable<User> | null,
    onSuccess?: () => void,
  ) {
    if (observableUser === null) {
      this.state.set({ ...initialState, status: 'success' });
      return onSuccess && onSuccess();
    }

    observableUser.subscribe({
      next: (user) => {
        this.state.update((state) => ({ ...state, user, status: 'success' }));
        onSuccess && onSuccess();
      },
      error: (error) => {
        this.state.update((state) => ({
          ...state,
          user: null,
          status: 'error',
          error: error.message,
        }));
      },
    });
  }

  public async signup(userData: UserSignup) {
    this.changeStatus('loading');

    const signupRespose = this.http.post<User>(
      `${ENV.API_URL}/auth/signup`,
      userData,
    );

    this.setUser(signupRespose, () => {
      this.router.navigate(['/']);
    });
  }

  public async login(userData: UserLogin) {
    this.changeStatus('loading');

    const loginRespose = this.http.post<User>(
      `${ENV.API_URL}/auth/login`,
      userData,
    );

    this.setUser(loginRespose, () => {
      this.router.navigate(['/']);
    });
  }

  public async logout() {
    const logoutResponse = this.http.get<{
      message: string;
      statusCode: number;
    }>(`${ENV.API_URL}/auth/logout`);

    logoutResponse.subscribe((data) => {
      if (data.statusCode === 200) {
        this.setUser(null, () => {
          this.router.navigate(['/auth/login']);
        });
      }
    });
  }

  public authenticate() {
    if (this.user()) {
      return;
    }

    this.changeStatus('loading');

    const userResponse = this.http.get<User>(`${ENV.API_URL}/auth/profile`);

    this.setUser(userResponse, () => {
      this.router.navigate(['/']);
    });
  }
}
