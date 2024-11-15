import mongoose from "mongoose";

const LectureSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section",
    },
    subject: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    order: {
        type: Number,
    },
});

const Lecture = mongoose.model("Lecture", LectureSchema);

export { Lecture };
