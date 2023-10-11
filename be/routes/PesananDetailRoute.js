import express from "express";
import {
  getPesanansDetail,
  getPesananDetailById,
  createPesananDetail,
  updatePesananDetail,
  deletePesananDetail,
  getPesananDetailByPesananId,
} from "../controllers/PesananDetail.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/pesanandetail", getPesanansDetail);
router.get("/pesanandetail/:id", getPesananDetailById);
router.get("/pesanandetailconst/:id", getPesananDetailByPesananId);
router.post("/pesanandetail", createPesananDetail);
router.patch("/pesanandetail/:id", updatePesananDetail);
router.delete("/pesanandetail/:id", deletePesananDetail);
export default router;
