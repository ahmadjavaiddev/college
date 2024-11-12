import {
    addLecture,
    deleteLecture,
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

router.post(
    "/:sectionId/add",
    verifyJWTUser,
    verifyUserRole(["ADMIN"]),
    addLecture
);
router.get(
    "/sections/:sectionId",
    verifyJWTUser,
    verifyUserRole(["ADMIN"]),
    getSectionLectures
);
router.put(
    "/sections/:sectionId",
    verifyJWTUser,
    verifyUserRole(["ADMIN"]),
    updateSectionLectures
);
router
    .route("/:lectureId")
    .put(verifyJWTUser, verifyUserRole(["ADMIN"]), updateLecture)
    .delete(verifyJWTUser, verifyUserRole(["ADMIN"]), deleteLecture);

export { router as lectureRouter };
