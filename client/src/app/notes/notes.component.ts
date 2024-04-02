import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}
