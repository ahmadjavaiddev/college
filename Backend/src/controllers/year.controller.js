import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Year } from "../models/year.model.js";

const addYear = asyncHandler(async (req, res) => {
    const { name } = req.body;

    const existingYear = await Year.findOne({ name });
    if (existingYear) {
        throw new ApiError(409, "Year with name already exists");
    }

    const year = await Year.create({ name });

    return res
        .status(200)
        .json(new ApiResponse(200, { year: year }, "year added successfully!"));
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

export { addYear, getYear };
