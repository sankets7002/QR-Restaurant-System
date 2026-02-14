import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createCategory, getCategories } from "../controllers/categoryController.js";

const router = express.Router();

router.post("/", protect(["admin"]), createCategory);
router.get("/", protect(["admin"]), getCategories);

export default router;
