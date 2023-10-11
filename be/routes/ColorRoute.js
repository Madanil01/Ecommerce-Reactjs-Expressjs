import express from "express";
import {
  getColors,
  getColorById,
  createColor,
  updateColor,
  deleteColor,
} from "../controllers/Color.js";
import { verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/colors", getColors);
router.get("/colors/:id", getColorById);
router.post("/colors", createColor);
router.patch("/colors/:id", updateColor);
router.delete("/colors/:id", deleteColor);

export default router;
