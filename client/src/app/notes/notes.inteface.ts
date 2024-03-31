export interface Link {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  redirectToId: string;
  createdAt: Date;
  updatedAt: Date;
  position?: number;
}

export interface Category {
  id: string;
  title: string;
  noteId: string;
  links: Link[];
  createdAt: Date;
  updatedAt: Date;
  position?: number;
}

export interface Note {
  id: string;
  title: string;
  authorId: string;
  categories: Category[];
  createdAt: Date;
  updatedAt: Date;
}
export type NoteList = Omit<Note, 'categories'>[];
