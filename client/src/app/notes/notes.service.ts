import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { NoteList } from 'src/app/notes/notes.inteface';
import { ENV } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  http = inject(HttpClient);

  getNotes() {
    return this.http.get<NoteList[]>(`${ENV.API_URL}/notes`);
  }
}
