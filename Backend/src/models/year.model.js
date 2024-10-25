import mongoose from "mongoose";

const yearSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    sections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        },
    ],
});

const Year = mongoose.model("Year", yearSchema);

export { Year };
