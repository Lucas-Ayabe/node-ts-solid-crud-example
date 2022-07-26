import { Note } from "../../models";

export type CreateNoteDto = Pick<Note, "title">;

export interface ReadNoteRepository {
  findAll(): Promise<Note[]>;
  findById(id: number): Promise<Note>;
}

export interface CreateNoteRepository {
  create(note: CreateNoteDto): Promise<Note>;
}

export interface UpdateNoteRepository {
  update(note: Note): Promise<void>;
}

export interface DeleteNoteRepository {
  delete(id: number): Promise<void>;
}

export type NoteRepository = ReadNoteRepository &
  CreateNoteRepository &
  UpdateNoteRepository &
  DeleteNoteRepository;
