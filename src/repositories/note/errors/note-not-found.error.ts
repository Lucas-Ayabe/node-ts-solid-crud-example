export class NoteNotFoundError extends Error {
  constructor(id: number) {
    super(`Note with id ${id} not found`);
  }
}
