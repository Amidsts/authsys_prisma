import { Router } from "express";
import signUp from "../auth/controllers/signUp";
import signIn from "./controllers/signIn";

const router = Router();

router.post("/signup", signUp);
router.post("/signIn", signIn);


export default router;
