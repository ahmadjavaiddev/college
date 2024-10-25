import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { generateAccessAndRefreshTokens } from "../utils/index.js";
import { cookieOptions } from "../constants.js";

const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "Admin with email already exists!");
    }

    const user = await User.create({
        name,
        email,
        password,
        role: "ADMIN",
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { success: true, adminId: user._id },
                "Admin Registered Successfully!"
            )
        );
});

const loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "Admin not found!");
    }
    console.log("user ::", user);

    const isValidPassword = await user.isPasswordCorrect(password);
    if (!isValidPassword) {
        throw new ApiError(401, "Invalid password!");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );
    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken -lectures -updatedAt -__v"
    );

    return res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    admin: loggedInUser,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
                "Admin Logged In Successfully!"
            )
        );
});

const getAdmin = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.adminId)
        .populate({
            path: "section",
            select: "name code",
            populate: {
                path: "branch",
                select: "name",
            },
        })
        .select("-password -refreshToken -lectures -updatedAt -__v");

    if (!user) {
        throw new ApiError(404, "Admin not found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, { user: user }, "Admin fetched successfully")
        );
});

const updateAdmin = asyncHandler(async (req, res) => {
    const adminId = req.params.adminId;
    if (!adminId) {
        throw new ApiError(401, "Admin not found!");
    }

    const { name, email, section } = req.body;

    const admin = await User.findByIdAndUpdate(
        adminId,
        {
            $set: {
                name: name,
                email: email,
                section: section,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken -lectures -updatedAt -__v");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { success: true, adminId: admin._id },
                "Admin Updated SuccessFully!"
            )
        );
});

export { registerAdmin, loginAdmin, getAdmin, updateAdmin };
