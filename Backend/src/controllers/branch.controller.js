import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Branch } from "../models/branch.model.js";
import mongoose from "mongoose";

const addBranch = asyncHandler(async (req, res) => {
    const { name, address, city, state } = req.body;

    const existingBranch = await Branch.findOne({ name });
    if (existingBranch) {
        throw new ApiError(409, "Branch with name already exists");
    }

    const branch = await Branch.create({
        name,
        address,
        city,
        state,
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { branch: branch },
                "Branch added successfully!"
            )
        );
});

const getBranch = asyncHandler(async (req, res) => {
    const branchId = req.params.branchId;
    if (!branchId) {
        throw new ApiError(401, "Branch not found!");
    }
    console.log("Branch ID :: ", branchId);

    // const branch = await Branch.findById(branchId);
    const branch = await Branch.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(branchId),
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
                // pipeline: [{ $project: { name: 1, email: 1, subject: 1 } }],
            },
        },
        // {
        //     $unwind: "$teachers",
        // },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { branch: branch },
                "Branch fetched successfully!"
            )
        );
});

const updateBranch = asyncHandler(async (req, res) => {
    const branchId = req.user._id;
    if (!branchId) {
        throw new ApiError(401, "Branch not found!");
    }

    const { name, address, city, state, sections, teachers } = req.body;

    const branch = await Branch.findByIdAndUpdate(
        branchId,
        {
            $set: {
                name: name,
                address: address,
                city: city,
                state: state,
                sections: sections,
                teachers: teachers,
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
                { branch: branch },
                "Branch Updated SuccessFully!"
            )
        );
});

export { addBranch, getBranch, updateBranch };
