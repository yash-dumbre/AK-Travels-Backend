import { Router } from "express";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/booking.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Public
router.post("/", createBooking);

// Protected
router.get("/", authenticate, getAllBookings);
router.get("/:id", authenticate, getBookingById);
router.patch("/:id/status", authenticate, updateBookingStatus);
router.delete("/:id", authenticate, deleteBooking);

export default router;