import {
    registerTeacher,
    getTeacher,
    loginTeacher,
    updateTeacher,
} from "../controllers/teacher.controller.js";
import express from "express";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
    "/register",
    verifyJWTUser,
    verifyUserRole(["ADMIN"]),
    upload.single("teacherProfile"),
    registerTeacher
);
router.post("/login", loginTeacher);
router
    .route("/:teacherId")
    .get(verifyJWTUser, verifyUserRole(["TEACHER", "ADMIN"]), getTeacher)
    .put(verifyJWTUser, verifyUserRole(["TEACHER", "ADMIN"]), updateTeacher);

export { router as teacherRouter };
