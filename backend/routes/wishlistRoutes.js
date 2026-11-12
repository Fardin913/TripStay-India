import { Router } from "express";
import { getWishlist, addWishlist, removeWishlist } from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
router.use(protect);
router.get("/", getWishlist);
router.post("/:hotelId", addWishlist);
router.delete("/:hotelId", removeWishlist);
export default router;
