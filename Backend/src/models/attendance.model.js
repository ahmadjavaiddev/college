import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
    {
        sectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section", // Reference to the lecture they attended
            required: true,
        },
        studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the lecture they attended
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        records: [
            {
                lectureId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Lecture",
                    required: true,
                },
                status: {
                    type: String,
                    enum: ["PRESENT", "ABSENT", "LEAVE", "LATE"],
                    default: "PRESENT",
                },
            },
        ],
    },
    { timestamps: true }
);

const Attendance = mongoose.model("Attendance", AttendanceSchema);

export { Attendance };
