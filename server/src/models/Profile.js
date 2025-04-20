import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;

const ProfileSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    language: {
      type: String,
      default: "en",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Profile", ProfileSchema);