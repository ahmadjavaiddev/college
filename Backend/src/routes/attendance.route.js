import express from "express";
import { markAttendance } from "../controllers/attendance.controller.js";
import {
    verifyJWTUser,
    verifyUserRole,
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/mark", verifyJWTUser, verifyUserRole(["ADMIN"]), markAttendance);

export { router as attendanceRouter };
