import express from "express";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";
import { getFormData } from "../controllers/random.controller.js";

const router = express.Router();

router.get("/data/form", verifyJWTUser, verifyUserRole(["ADMIN"]), getFormData);

export { router as randomRouter };
