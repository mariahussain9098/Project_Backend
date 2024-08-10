import { Router } from "express";
import {
  getAllReviews,
  createReview,
  getReviewById,
  updateReview,
  deleteReview,
} from "./review.service";

const router = Router();

router.get("/", getAllReviews);
router.post("/", createReview);
router.get("/:id", getReviewById);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export const ReviewRouter = router;
