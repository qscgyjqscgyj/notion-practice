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
  template: ` <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
      <div>
        <label for="name">Name:</label>
        <input type="text" id="name" formControlName="name" />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" formControlName="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" formControlName="password" />
      </div>
      <button type="submit" [disabled]="!signupForm.valid">Sign Up</button>
    </form>

    <a [routerLink]="loginUrl">Log In</a>`,
})
export class SignupComponent {
  authService = inject(AuthService);

  loginUrl = `/${ROUTES.AUTH.LOGIN}`;

  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  onSubmit() {
    if (this.signupForm.valid) {
      const { email, password, name } = this.signupForm.value;

      if (name && email && password) {
        this.authService.signup({ name, email, password });
      }
    }
  }
}
