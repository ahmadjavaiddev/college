import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Section } from "../models/section.model.js";
import { Branch } from "../models/branch.model.js";
import mongoose from "mongoose";

const addSection = asyncHandler(async (req, res) => {
    const { name, code, branch, incharge } = req.body;

    const existingSection = await Section.findOne({ name, code, branch });
    if (existingSection) {
        throw new ApiError(
            409,
            "Section with name, code and branch already exists"
        );
    }

    const section = await Section.create({
        name,
        code,
        branch,
        incharge,
    });
    await Branch.findByIdAndUpdate(branch, {
        $push: { sections: section._id },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { section: section },
                "Section added successfully!"
            )
        );
});

const getSection = asyncHandler(async (req, res) => {
    const sectionId = req.params.sectionId;
    if (!sectionId) {
        throw new ApiError(401, "Section not found!");
    }

    const section = await Section.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(sectionId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "incharge",
                foreignField: "_id",
                as: "incharge",
            },
        },
        {
            $unwind: "$incharge",
        },
        {
            $lookup: {
                from: "branches",
                localField: "branch",
                foreignField: "_id",
                as: "branch",
            },
        },
        {
            $unwind: "$branch",
        },
        {
            $project: {
                name: 1,
                incharge: { firstName: 1, lastName: 1 },
                branch: { name: 1 },
            },
        },
    ]);

    if (section.length === 0) {
        throw new ApiError(404, "Section not found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { section: section[0] },
                "Section fetched successfully!"
            )
        );
});

const getAllSections = asyncHandler(async (req, res) => {
    const sections = await Section.find({
        branch: "6727d2f811a3e00c11906416",
    }).select("name");

    if (!sections || sections.length === 0) {
        throw new ApiError(401, "No sections found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { sections },
                "Sections with lectures fetched successfully!"
            )
        );
});

const getSectionsIds = asyncHandler(async (req, res) => {
    const sections = await Section.find().select(
        "-branch -incharge -lectures -students"
    );

    if (!sections) {
        throw new ApiError(401, "Sections are not found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { sections: sections },
                "Sections fetched successfully!"
            )
        );
});

const updateSection = asyncHandler(async (req, res) => {
    const sectionId = req.user._id;
    if (!sectionId) {
        throw new ApiError(401, "Section not found!");
    }

    const { name, code, branch, incharge } = req.body;

    const section = await Section.findByIdAndUpdate(
        sectionId,
        {
            $set: {
                name: name,
                code: code,
                branch: branch,
                incharge: incharge,
            },
        },
        {
            new: true,
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { section: section },
                "Section Updated SuccessFully!"
            )
        );
});

export {
    addSection,
    getSection,
    getAllSections,
    getSectionsIds,
    updateSection,
};
