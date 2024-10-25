import mongoose from "mongoose";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        year: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Year",
            required: true,
        },
        role: {
            type: String,
            enum: ["STUDENT", "TEACHER", "ADMIN"],
            default: "STUDENT",
        },
        branch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Branch",
            required: function () {
                return this.role !== "ADMIN" && this.role !== "STUDENT";
            },
        },
        section: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            required: function () {
                return this.role === "STUDENT";
            },
        },
        image: {
            type: String,
        },
        lectures: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Lecture",
                required: function () {
                    return this.role === "TEACHER";
                },
            },
        ],
        refreshToken: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

UserSchema.pre("save", function (next) {
    if (this.role !== "TEACHER") {
        this.lectures = undefined;
    }
    if (this.role !== "STUDENT") {
        this.rollNumber = undefined;
    }

    if (this.role !== "ADMIN") {
        this.branch = undefined;
    }

    next();
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await argon2.hash(this.password);
    next();
});

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await argon2.verify(this.password, password);
};

UserSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: this.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

UserSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            role: this.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

const User = mongoose.model("User", UserSchema);

export { User };
