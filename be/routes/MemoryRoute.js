import express from "express";
import {
  getMemorys,
  getMemoryById,
  createMemory,
  updateMemory,
  deleteMemory,
} from "../controllers/Memory.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/memorys", getMemorys);
router.get("/memorys/:id", getMemoryById);
router.post("/memorys", createMemory);
router.patch("/memorys/:id", updateMemory);
router.delete("/memorys/:id", deleteMemory);

export default router;
