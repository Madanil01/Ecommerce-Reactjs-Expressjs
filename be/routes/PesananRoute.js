import express from "express";
import {
  getPesanans,
  getPesananById,
  createPesanan,
  updatePesanan,
  deletePesanan,
  deletePesananByUserUUid,
  getPesananByUserUuid,
} from "../controllers/Pesanans.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/pesanan", getPesanans);
router.get("/pesanan/:id", getPesananById);
router.get("/pesananuser/:id", getPesananByUserUuid);
router.post("/pesanan", createPesanan);
router.patch("/pesanan/:id", updatePesanan);
router.delete("/pesanan/:id", deletePesanan);
router.delete("/pesananuseruuid/:id", deletePesananByUserUUid);
export default router;
