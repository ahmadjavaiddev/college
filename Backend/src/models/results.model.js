import mongoose from "mongoose";

const ResultSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    subject: { type: String, required: true },
    marksObtained: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    examDate: { type: Date, required: true },
});

const Result = mongoose.model("Result", ResultSchema);

export { Result };
