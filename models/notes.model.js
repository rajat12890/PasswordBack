import mongoose from "mongoose";
const notesSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"] },

    category: {
      type: String,
      required: [true, "Category is required"],
    },

    description: {
      type: String,
      required: [true, "Description is required"],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Notes = mongoose.model("Notes", notesSchema);
