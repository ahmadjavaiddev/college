import {
    addSection,
    getSection,
    getSectionsIds,
    updateSection,
} from "../controllers/section.controller.js";
import express from "express";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", verifyJWTUser, verifyUserRole(["ADMIN"]), addSection);
router
    .route("/:sectionId")
    .get(
        verifyJWTUser,
        verifyUserRole(["ADMIN", "TEACHER", "STUDENT"]),
        getSection
    )
    .put(
        verifyJWTUser,
        verifyUserRole(["ADMIN", "TEACHER", "STUDENT"]),
        updateSection
    );
router.get("/", verifyJWTUser, verifyUserRole(["ADMIN"]), getSectionsIds);

export { router as sectionRouter };
