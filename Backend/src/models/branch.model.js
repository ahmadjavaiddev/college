import mongoose from "mongoose";

const BranchSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    sections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
        },
    ],
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
    ],
});

const Branch = mongoose.model("Branch", BranchSchema);

export { Branch };
