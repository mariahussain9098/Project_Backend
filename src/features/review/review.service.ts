import { CustomRequestHandler } from "../../types/common";
import { Review } from "./review.entity";

export const getAllReviews: CustomRequestHandler = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createReview: CustomRequestHandler = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getReviewById: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateReview: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { teacher, feedback, rating } = req.body;
    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (teacher) review.teacher = teacher;
    if (feedback) review.feedback = feedback;
    if (rating) review.rating = rating;

    await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteReview: CustomRequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
};
