import express from "express";
import {Login, logOut, Me, Register} from "../controllers/Auth.js";

const router = express.Router();

router.get('/me', Me);
router.post('/login', Login);
router.delete('/logout', logOut);
router.post("/register", Register);

export default router;
