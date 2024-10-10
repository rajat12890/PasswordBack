import mongoose from "mongoose";
import { Notes } from "../models/notes.model.js";
import { catchayncerror } from "../middlewares/catchasyncerror.js";
import { User } from "../models/user.model.js";

const createNotes = catchayncerror(async (req, res, next) => {
  const { title, description, category, userId } = req.body;



  if (!title  || !description || !category) {
    return res.status(408).json({
      success: false,
      messages: "Please Fill all fields",
    });
  }

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  let newNotes = await Notes.create({
    title: title,
    category: category,
    description: description,
    user: userId,
  });

  user.notes.push(newNotes);

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Notes Added Successfully",
    user,
  });
});
const deleteNotes = catchayncerror(async (req, res, next) => {
  const noteId = req.params.id;
  const userId = req.body.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const NoteElement = await Notes.findByIdAndDelete(noteId);
  // console.log(NoteElement._id);
  if (!NoteElement) {
    return res.status(400).json({
      success: false,
      message: "note not found",
    });
  }

  user.notes = user.notes.filter((items) => !items._id.equals(NoteElement._id));
  // user.updateOne({transactions:})
  // console.log(temp);
  await user.save();
  // console.log(user.transactions);

  return res.status(200).json({
    success: true,
    message: `Notes successfully deleted`,
    user,
  });
});

const updateNotes = catchayncerror(async (req, res, next) => {
  const noteId = req.params.id;
  const userId = req.body.userId;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  const { title, description, category } = req.body;

  const NoteElement = await Notes.findById(noteId);

  if (!NoteElement) {
    return res.status(400).json({
      success: false,
      message: "note not found",
      user,
    });
  }

  if (title) {
    NoteElement.title = title;
  }

  if (description) {
    NoteElement.description = description;
  }

  if (category) {
    NoteElement.category = category;
  }

  await NoteElement.save();

  const index = user.notes.findIndex((note) =>
    note._id.equals(noteId)
  );
  // console.log(index);
  if (index !== -1) {
    user.notes[index] = NoteElement;
    // console.log(user.transactions[index]);
  }

  await user.save();

  return res.status(200).json({
    success: true,
    message: `Notes Updated Successfully`,
    user,
  });
});


export { createNotes, deleteNotes, updateNotes };
