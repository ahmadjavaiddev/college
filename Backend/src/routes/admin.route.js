import express from "express";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";
import {
    registerAdmin,
    loginAdmin,
    getAdmin,
    updateAdmin,
    verifyUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/", verifyJWTUser, verifyUserRole(["ADMIN"]), verifyUser);

router
    .route("/:adminId")
    .get(verifyJWTUser, verifyUserRole(["ADMIN"]), getAdmin)
    .put(verifyJWTUser, verifyUserRole(["ADMIN"]), updateAdmin);

export { router as adminRouter };
