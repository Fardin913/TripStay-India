import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createCheckoutSession, confirmCheckout, cancelCheckout } from "../controllers/paymentController.js";
const router = Router();
router.use(protect);
router.post("/checkout-session", createCheckoutSession);
router.get("/confirm", confirmCheckout);
router.post("/cancel", cancelCheckout);
export default router;
