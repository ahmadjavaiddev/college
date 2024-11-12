import express from "express";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";
import {
    getFormData,
    getTeachersFormData,
} from "../controllers/random.controller.js";

const router = express.Router();

router.get("/data/form", verifyJWTUser, verifyUserRole(["ADMIN"]), getFormData);
router.get(
    "/teachers/form",
    verifyJWTUser,
    verifyUserRole(["ADMIN"]),
    getTeachersFormData
);

export { router as randomRouter };
