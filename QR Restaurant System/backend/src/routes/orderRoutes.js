import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createOrder, getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", protect(["chef", "admin"]), getOrders);

export default router;
