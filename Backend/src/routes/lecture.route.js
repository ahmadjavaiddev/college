import {
    addLecture,
    getSectionLectures,
} from "../controllers/lecture.controller.js";
import express from "express";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", verifyJWTUser, verifyUserRole(["ADMIN"]), addLecture);
// router.get("/sections/sectionId", verifyJWTUser, verifyUserRole(["ADMIN"]), addLecture);
router.get("/sections/:sectionId", getSectionLectures);

export { router as lectureRouter };
