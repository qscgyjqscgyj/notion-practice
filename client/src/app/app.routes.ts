import { Routes } from '@angular/router';
import { NotesComponent } from 'src/app/notes/notes.component';
import {
  AuthenticationRequiredGuard,
  AlreadyAuthenticatedGuard,
} from 'src/app/auth/auth.guard';
import { SignupComponent } from 'src/app/auth/signup.component';
import { LoginComponent } from 'src/app/auth/login.component';
import { ROUTES } from 'src/app/app.constants';

export const routes: Routes = [
  {
    path: ROUTES.AUTH.LOGIN,
    component: LoginComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  {
    path: ROUTES.AUTH.SIGNUP,
    component: SignupComponent,
    canActivate: [AlreadyAuthenticatedGuard],
  },
  {
    path: '',
    component: NotesComponent,
    pathMatch: 'full',
    canActivate: [AuthenticationRequiredGuard],
  },
];
