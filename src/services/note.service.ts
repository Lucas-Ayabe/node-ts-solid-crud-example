import { EmptyStringError } from "../shared/errors";
import { CreateNoteDto, NoteRepository } from "../repositories/note";

export class NoteService {
  constructor(private noteRepository: NoteRepository) {}

  async findAll() {
    return this.noteRepository.findAll();
  }

  async findById(id: number) {
    return this.noteRepository.findById(id);
  }

  async create(noteContent: CreateNoteDto) {
    if (noteContent.title.length === 0) {
      throw new EmptyStringError("title cannot be empty");
    }

    return this.noteRepository.create(noteContent);
  }

  async update(id: number, newContent: CreateNoteDto) {
    const note = await this.noteRepository.findById(id);
    note.rename(newContent.title);
    return this.noteRepository.update(note);
  }

  async delete(id: number) {
    return this.noteRepository.delete(id);
  }
}
