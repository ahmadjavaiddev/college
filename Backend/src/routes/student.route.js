import express from "express";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";
import {
    getExistingStudents,
    getLectureStudents,
    getSectionStudents,
    getStudent,
    loginStudent,
    registerStudent,
    updateStudent,
} from "../controllers/student.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post(
    "/register",
    verifyJWTUser,
    verifyUserRole(["ADMIN"]),
    upload.single("studentProfile"),
    registerStudent
);
router.post("/login", loginStudent);
router
    .route("/:studentId")
    .get(
        verifyJWTUser,
        verifyUserRole(["STUDENT", "TEACHER", "ADMIN"]),
        getStudent
    )
    .put(
        verifyJWTUser,
        verifyUserRole(["STUDENT", "TEACHER", "ADMIN"]),
        updateStudent
    );

router.route("/sections/:sectionId").get(getSectionStudents);
router.route("/sections/:sectionId/lecture").get(getLectureStudents);
router
    .route("/")
    .get(verifyJWTUser, verifyUserRole(["ADMIN"]), getExistingStudents);

export { router as studentRouter };
