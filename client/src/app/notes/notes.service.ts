import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoteList } from 'src/app/notes/notes.inteface';
import { ENV } from 'src/env/env';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(private http: HttpClient) {}

  private baseUrl = ENV.API_URL;

  getNotes() {
    return this.http.get<NoteList[]>(`${this.baseUrl}/notes`);
  }
}
