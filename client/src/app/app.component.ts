import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    @if (authServices.status() !== 'loading') {
    <router-outlet />
    }
  `,
})
export class AppComponent {
  authServices = inject(AuthService);

  title = 'notion-client';

  ngOnInit() {
    this.authServices.authenticate();
  }
}
