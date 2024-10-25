import express from "express";
import {
    addBranch,
    getBranch,
    updateBranch,
} from "../controllers/branch.controller.js";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add", verifyJWTUser, verifyUserRole(["ADMIN"]), addBranch);
router
    .route("/:branchId")
    .get(verifyJWTUser, verifyUserRole(["ADMIN"]), getBranch)
    .put(verifyJWTUser, verifyUserRole(["ADMIN"]), updateBranch);

export { router as branchRouter };
