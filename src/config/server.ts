import express from "express";
import cors from "cors";
import { defineRoutes } from "./routes";

export const address = "http://localhost";
export const port = 3000;

export const app = () => {
  const server = express();

  server.use(cors());
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  defineRoutes(server);

  server.listen(port, () => {
    console.log(`App listening in ${address}:${port}`);
  });
};
