import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UserLogin, User, UserSignup } from 'src/app/auth/user.interface';
import { ENV } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  private baseUrl = ENV.API_URL;

  public user: User | null = null;

  public async signup(userData: UserSignup) {
    const signupRespose = this.http.post<User>(
      `${this.baseUrl}/auth/signup`,
      userData,
    );

    const user = await firstValueFrom(signupRespose);

    this.user = user;
  }

  public async login(userData: UserLogin) {
    const loginRespose = this.http.post<User>(
      `${this.baseUrl}/auth/login`,
      userData,
    );

    const user = await firstValueFrom(loginRespose);

    this.user = user;

    this.router.navigate(['/']);
  }

  public async isLoggedIn(): Promise<boolean> {
    const userResponse = this.http.get<User>(`${this.baseUrl}/auth/profile`, {
      withCredentials: true,
    });

    if (!userResponse) {
      return false;
    }

    const user = await firstValueFrom(userResponse);

    this.user = user;

    return !!user;
  }
}
