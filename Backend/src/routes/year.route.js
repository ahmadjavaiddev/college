import express from "express";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";
import { addYear } from "../controllers/year.controller.js";

const router = express.Router();

router.post("/add", verifyJWTUser, verifyUserRole(["ADMIN"]), addYear);

export { router as yearRouter };
