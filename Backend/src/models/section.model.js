import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Branch",
    },
    incharge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    lectures: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Lecture",
        },
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
});

const Section = mongoose.model("Section", SectionSchema);

export { Section };
