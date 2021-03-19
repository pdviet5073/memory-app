import express from "express";

const router = express.Router();
import {signUp,signIn} from "../controllers/userController.js";

router.post("/signIn", signIn);
router.post("/signUp", signUp);

export default router;
