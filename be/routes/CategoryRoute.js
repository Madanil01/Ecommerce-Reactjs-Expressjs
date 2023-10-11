import express from "express";
import {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/Category.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/category", getCategory);
router.get("/category/:id", getCategoryById);
router.post("/category", createCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id",   deleteCategory);

export default router;
