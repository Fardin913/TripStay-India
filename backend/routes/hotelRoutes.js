import { Router } from "express";
import { getHotels, getHotel, createHotel } from "../controllers/hotelController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
router.get("/", getHotels);
router.get("/:id", getHotel);
router.post("/", protect, createHotel);
export default router;
