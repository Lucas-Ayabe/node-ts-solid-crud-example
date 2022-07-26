import { Note } from "../../models";
import { NoteNotFoundError } from "./errors";
import { CreateNoteDto, NoteRepository } from "./note-repository";

export class InMemoryNoteRepository implements NoteRepository {
  private source: Note[] = [];

  async findAll() {
    return this.source;
  }

  async findById(id: number) {
    const noteOrUndefined = this.source.find((note) => note.id === id);

    if (!noteOrUndefined) {
      throw new NoteNotFoundError(id);
    }

    return noteOrUndefined;
  }

  async create(note: CreateNoteDto) {
    const createdNote = new Note(this.source.length, note.title);
    this.source.push(createdNote);
    return createdNote;
  }

  async update(updatedNote: Note) {
    this.source = this.source.map((originalNote) => {
      return originalNote.isEqualTo(updatedNote) ? updatedNote : originalNote;
    });
  }

  async delete(id: number) {
    this.source = this.source.filter((originalNote) => originalNote.id !== id);
  }
}
