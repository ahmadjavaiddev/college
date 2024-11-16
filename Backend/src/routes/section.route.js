import {
    addSection,
    // getAllSections,
    getAllSectionsWithNames,
    getSection,
    getSections,
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

router.get("/", verifyJWTUser, verifyUserRole(["ADMIN"]), getSections);
router.get(
    "/names",
    verifyJWTUser,
    verifyUserRole(["ADMIN"]),
    getAllSectionsWithNames
);

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
router.get("/ids", verifyJWTUser, verifyUserRole(["ADMIN"]), getSectionsIds);

export { router as sectionRouter };
