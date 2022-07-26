import { Express } from "express";
import * as Dependencies from "./di";

export const defineRoutes = (server: Express): void => {
  server.get("/notes", Dependencies.noteController.list);
  server.get("/notes/:id", Dependencies.noteController.findNote);
  server.post("/notes", Dependencies.noteController.create);
  server.put("/notes/:id", Dependencies.noteController.update);
  server.delete("/notes/:id", Dependencies.noteController.delete);
};
