import express from "express";
import { studentRouter } from "./routes/student.route.js";
import { branchRouter } from "./routes/branch.route.js";
import { sectionRouter } from "./routes/section.route.js";
import { teacherRouter } from "./routes/teacher.route.js";
import { lectureRouter } from "./routes/lecture.route.js";
import cookieParser from "cookie-parser";
import { adminRouter } from "./routes/admin.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { attendanceRouter } from "./routes/attendance.route.js";
import cors from "cors";
import { yearRouter } from "./routes/year.route.js";
import { randomRouter } from "./routes/random.route.js";
// import vhost from "vhost";

const app = express();

app.use(
    cors({
        origin: ["http://localhost:5173", "*"], // Replace with your actual frontend URL
        credentials: true,
    })
);

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// app.get("/", (req, res) => {
//     console.log(req);
//     res.send("Hello World > Here");
// });

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/branch", branchRouter);
app.use("/api/v1/sections", sectionRouter);
app.use("/api/v1/teachers", teacherRouter);
app.use("/api/v1/lectures", lectureRouter);
app.use("/api/v1/attendance", attendanceRouter);
app.use("/api/v1/year", yearRouter);
app.use("/api/v1/random", randomRouter);

// app.use(vhost("admin.localhost", branchRouter));
// app.use(vhost("admin.localhost/section", sectionRouter));
// app.use(vhost("admin.localhost/lecture", lectureRouter));
// app.use(vhost("teacher.localhost", teacherRouter));
// app.use(vhost("student.localhost", studentRouter));

app.use(errorHandler);

export { app };
