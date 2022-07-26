import { Request, Response } from "express";
import { NoteService } from "../services/note.service";

export class NoteController {
  constructor(private noteService: NoteService) {}

  private validateRequest(
    properties: string[],
    request: Request,
    response: Response
  ) {
    const body = Object.keys(request.body);
    const isValid = properties.every((property) => body.includes(property));
    if (!isValid) {
      response.status(400).json({
        error: new Error(`${properties.join(", ")} are required`),
      });

      return false;
    }

    return true;
  }

  private validatePathId(request: Request, response: Response) {
    const { id } = request.params;
    if (!id) {
      response.status(400).json({
        error: new Error(`id is required`),
      });

      return false;
    }

    return +id;
  }

  async list(_request: Request, response: Response) {
    response.json(await this.noteService.findAll());
  }

  async findNote(request: Request, response: Response) {
    const id = this.validatePathId(request, response);

    if (id !== false) {
      response.json(await this.noteService.findById(id));
    }
  }

  async create(request: Request, response: Response) {
    const isValid = this.validateRequest(["title"], request, response);

    if (isValid) {
      const { title } = request.body;

      this.noteService
        .create({ title })
        .then((note) => response.json(note))
        .catch((error) =>
          response.status(400).json({
            error,
          })
        );
    }
  }

  async update(request: Request, response: Response) {
    const id = this.validatePathId(request, response);
    if (id === false) return;

    const isValid = this.validateRequest(["title"], request, response);
    if (isValid) {
      const { title } = request.body;
      const responseContent = await this.noteService
        .update(id, { title })
        .then(() => ({
          status: 200,

          payload: { message: "Note is updated." },
        }))
        .catch((error) => ({
          status: 400,
          payload: { error },
        }));

      response.status(responseContent.status).json(responseContent.payload);
    }
  }

  async delete(request: Request, response: Response) {
    const id = this.validatePathId(request, response);
    if (id !== false) {
      await this.noteService.delete(id);
      response.json({ message: "Note is deleted" });
    }
  }
}
