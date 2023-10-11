import express from "express";
import {
  getVariasi,
  getVariasiById,
  createVariasi,
  updateVariasi,
  deleteVariasi,
  getVariasiByProductId,
  getVariasiByIdConst,
} from "../controllers/Variasi.js";
// import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/variasi", getVariasi);
router.get("/variasi/:id", getVariasiById);
router.get("/variasiconst/:id", getVariasiByIdConst);
router.get("/variasi/product/:id", getVariasiByProductId);
router.post("/variasi", createVariasi);
router.patch("/variasi/:id", updateVariasi);
router.delete("/variasi/:id", deleteVariasi);

export default router;
