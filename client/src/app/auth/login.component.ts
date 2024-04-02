import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTES } from 'src/app/app.constants';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" formControlName="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" formControlName="password" />
      </div>
      <button type="submit" [disabled]="!loginForm.valid">Login</button>
    </form>

    <a [routerLink]="signupUrl">Register</a>
  `,
})
export class LoginComponent {
  authService = inject(AuthService);

  signupUrl = `/${ROUTES.AUTH.SIGNUP}`;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      if (email && password) {
        this.authService.login({ email, password });
      }
    }
  }
}
