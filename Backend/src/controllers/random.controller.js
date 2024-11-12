import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Year } from "../models/year.model.js";
import { Section } from "../models/section.model.js";
import { Branch } from "../models/branch.model.js";
import { User } from "../models/user.model.js";

const getFormData = asyncHandler(async (req, res) => {
    const years = await Year.aggregate([
        {
            $project: {
                name: 1,
            },
        },
    ]);
    const sections = await Section.aggregate([
        {
            $project: {
                name: 1,
            },
        },
    ]);

    if (!years || years.length === 0) {
        throw new ApiError(401, "Years not found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { years: years, sections: sections },
                "years fetched successfully!"
            )
        );
});

const getTeachersFormData = asyncHandler(async (req, res) => {
    const branchId = req.params.branchId || "6727d2f811a3e00c11906416";
    const teachers = await User.aggregate([
        {
            $match: {
                role: "TEACHER",
                branchId: new mongoose.Types.ObjectId(branchId),
            },
        },
        {
            $project: {
                firstName: 1,
                lastName: 1,
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { teachers: teachers },
                "years fetched successfully!"
            )
        );
});

const getYear = asyncHandler(async (req, res) => {
    const yearId = req.params.yearId;
    if (!yearId) {
        throw new ApiError(401, "year not found!");
    }

    const year = await Year.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(yearId),
            },
        },
        {
            $lookup: {
                from: "sections",
                localField: "sections",
                foreignField: "_id",
                as: "sections",
                pipeline: [{ $project: { name: 1, code: 1 } }],
            },
        },
        {
            $unwind: "$sections",
        },
        {
            $lookup: {
                from: "users",
                localField: "teachers",
                foreignField: "_id",
                as: "teachers",
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(200, { year: year }, "year fetched successfully!")
        );
});

export { getFormData, getTeachersFormData, getYear };
