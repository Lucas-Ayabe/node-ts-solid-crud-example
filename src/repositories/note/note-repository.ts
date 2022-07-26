import { Note } from "../../models";

export type CreateNoteDto = Pick<Note, "title">;

export interface NoteRepository {
  findAll(): Promise<Note[]>;
  findById(id: number): Promise<Note>;
  create(note: CreateNoteDto): Promise<Note>;
  update(note: Note): Promise<void>;
  delete(id: number): Promise<void>;
}
