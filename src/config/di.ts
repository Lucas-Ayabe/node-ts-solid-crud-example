import { NoteController } from "../controllers/note.controller";
import { InMemoryNoteRepository, NoteRepository } from "../repositories/note";
import { NoteService } from "../services/note.service";

export const noteRepository: NoteRepository = new InMemoryNoteRepository();
export const noteService: NoteService = new NoteService(noteRepository);
export const noteController: NoteController = new NoteController(noteService);
