import express from "express";
import {
  createNotes,
  deleteNotes,
  updateNotes,
} from "../controllers/notes.controller.js";

const notesRouter = express.Router();
notesRouter.route("/addNotes").post(createNotes);

notesRouter.route("/deleteNotes/:id").post(deleteNotes);

notesRouter.route("/updateNotes/:id").put(updateNotes);

export { notesRouter };
