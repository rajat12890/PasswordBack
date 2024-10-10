import mongoose from "mongoose";
const passwordSchema = new mongoose.Schema(
  {
    // title: { type: String, required: [true, "Title is required"] },
    
    category: {
      type: String,
      required: [true, "Category is required"],
    },

   pass: {
      type: String,
      required: [true, "Password is required"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Password = mongoose.model("Password", passwordSchema);
