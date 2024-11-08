import {
    addLecture,
    getSectionLectures,
    updateLecture,
    updateSectionLectures,
} from "../controllers/lecture.controller.js";
import express from "express";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", verifyJWTUser, verifyUserRole(["ADMIN"]), addLecture);
router.get(
    "/sections/:sectionId",
    verifyJWTUser,
    verifyUserRole(["ADMIN"]),
    getSectionLectures
);
router.put("/sections/:sectionId", updateSectionLectures);
router.put("/:lectureId", updateLecture);

export { router as lectureRouter };
