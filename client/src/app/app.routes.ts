import { Routes } from '@angular/router';
import { NotesComponent } from 'src/app/notes/notes.component';
import { AuthGuard, AuthRedirectGuard } from 'src/app/auth/auth.guard';
import { SignupComponent } from 'src/app/auth/signup/signup.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { ROUTES } from 'src/app/app.constants';

export const routes: Routes = [
  {
    path: ROUTES.AUTH.LOGIN,
    component: LoginComponent,
    canActivate: [AuthRedirectGuard],
  },
  {
    path: ROUTES.AUTH.SIGNUP,
    component: SignupComponent,
    canActivate: [AuthRedirectGuard],
  },
  {
    path: '',
    component: NotesComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
];
