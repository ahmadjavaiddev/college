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
    time: {
        type: String,
        required: true,
    },
});

const Lecture = mongoose.model("Lecture", LectureSchema);

export { Lecture };
