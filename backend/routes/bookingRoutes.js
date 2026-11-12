import { Router } from "express";
import { getMyBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
router.use(protect);
router.get("/my", getMyBookings);
export default router;
