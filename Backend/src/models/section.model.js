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
            day: {
                type: String,
            },
            subjects: [
                {
                    subject: String,
                    time: String,
                },
            ],
        },
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
});

SectionSchema.pre("save", function (next) {
    if (this.lectures.length !== 6) {
        const Days = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        while (this.lectures.length !== 6) {
            this.lectures.push({
                day: Days[this.lectures.length],
            });
        }
        return next();
    }
    next();
});

const Section = mongoose.model("Section", SectionSchema);

export { Section };
