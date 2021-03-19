import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: String,
    name: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);


export default  mongoose.model("PostsMessage", postSchema)