import { Schema, model } from "mongoose";

const reviewSchema = new Schema({
  teacher: {
    type: String,
    required: [true, "Teacher is required"],
  },
  feedback: {
    type: String,
    required: [true, "Feedback is required"],
  },
  rating: {
    type: Number,
    required: [true, "Rating is required"],
  },
});

export const Review = model("Review", reviewSchema);
