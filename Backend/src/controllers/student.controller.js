import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Section } from "../models/section.model.js";
import { generateAccessAndRefreshTokens } from "../utils/index.js";
import { cookieOptions } from "../constants.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerStudent = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, password, branchId, sectionId, year } =
        req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "Student with email already exists!");
    }

    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    console.log("cloudinaryResponse ::", cloudinaryResponse);
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: "123",
        rollNumber: "233409",
        branch: "66ffd80b3e20756aec48194a",
        section: sectionId,
        year: year,
        image: cloudinaryResponse.secure_url,
    });
    await Section.findByIdAndUpdate(sectionId, {
        $push: { students: user._id },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { success: true, studentId: user._id },
                "Student Registered Successfully!"
            )
        );
});

const loginStudent = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError(404, "Student not found!");
    }

    const isValidPassword = await user.isPasswordCorrect(password);
    if (!isValidPassword) {
        throw new ApiError(401, "Invalid password!");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );
    const loggedInUser = await User.findById(user._id)
        .populate({
            path: "section",
            select: "name code",
            populate: {
                path: "branch",
                select: "name",
            },
        })
        .select("-password -refreshToken -lectures -updatedAt -__v");

    return res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    student: loggedInUser,
                },
                "Student Logged In Successfully!"
            )
        );
});

const getStudent = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.params.studentId),
                role: "STUDENT",
            },
        },
        {
            $lookup: {
                from: "sections",
                localField: "section",
                foreignField: "_id",
                as: "section",
                pipeline: [{ $project: { name: 1 } }],
            },
        },
        {
            $unwind: "$section",
        },
        {
            $lookup: {
                from: "years",
                localField: "year",
                foreignField: "_id",
                as: "year",
                pipeline: [{ $project: { name: 1 } }],
            },
        },
        {
            $unwind: "$year",
        },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                section: 1,
                image: 1,
                year: 1,
            },
        },
    ]);

    if (!user) {
        throw new ApiError(404, "Student not found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { user: user[0] },
                "Student fetched successfully"
            )
        );
});

const getSectionStudents = asyncHandler(async (req, res) => {
    const sectionId = req.params.sectionId;
    if (!sectionId) {
        throw new ApiError(401, "Section not found!");
    }

    const students = await User.aggregate([
        {
            $match: {
                section: new mongoose.Types.ObjectId(sectionId),
                role: "STUDENT",
            },
        },
        {
            $lookup: {
                from: "sections",
                localField: "section",
                foreignField: "_id",
                as: "section",
                pipeline: [{ $project: { name: 1 } }],
            },
        },
        {
            $unwind: {
                path: "$section",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "years",
                localField: "year",
                foreignField: "_id",
                as: "year",
                pipeline: [{ $project: { name: 1 } }],
            },
        },
        {
            $unwind: {
                path: "$year",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $lookup: {
                from: "attendances",
                localField: "_id",
                foreignField: "studentId",
                as: "attendance",
                pipeline: [
                    {
                        $project: { records: 1 },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: "$attendance",
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                section: {
                    name: 1,
                },
                image: 1,
                year: {
                    name: 1,
                },
                attendance: 1,
            },
        },
    ]);

    if (!students || students.length === 0) {
        throw new ApiError(401, "Students not found!");
    }

    const formattedStudents = students.map((student) => {
        const { _id, firstName, lastName, email, year, section, image } =
            student;
        const length = student?.attendance?.records?.length - 1;
        const status = student?.attendance?.records[length]?.status;

        return {
            _id,
            firstName,
            lastName,
            email,
            year: year?.name,
            section: section?.name,
            image,
            status,
        };
    });

    const values = {};

    formattedStudents.forEach((item) => {
        values[item.status?.toLowerCase()] =
            (values[item?.status?.toLowerCase()] || 0) + 1;
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                students: formattedStudents,
                attendanceDetails: {
                    ...values,
                    totalStudents: students.length,
                },
            },
            "Students fetched successfully!"
        )
    );
});

const getLectureStudents = asyncHandler(async (req, res) => {
    const sectionId = req.params.sectionId;
    if (!sectionId) {
        throw new ApiError(401, "Section not found!");
    }

    const students = await User.aggregate([
        {
            $match: {
                section: new mongoose.Types.ObjectId(sectionId),
                role: "STUDENT",
            },
        },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                image: 1,
            },
        },
    ]);

    if (!students || students.length === 0) {
        throw new ApiError(401, "Students not found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { students: students },
                "Students fetched successfully!"
            )
        );
});

const getExistingStudents = asyncHandler(async (req, res) => {
    const students = await User.aggregate([
        {
            $match: {
                role: "STUDENT",
            },
        },
        {
            $lookup: {
                from: "sections",
                localField: "section",
                foreignField: "_id",
                as: "section",
                pipeline: [{ $project: { name: 1 } }],
            },
        },
        {
            $unwind: "$section",
        },
        {
            $lookup: {
                from: "years",
                localField: "year",
                foreignField: "_id",
                as: "year",
                pipeline: [{ $project: { name: 1 } }],
            },
        },
        {
            $unwind: "$year",
        },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                section: 1,
                year: 1,
                image: 1,
            },
        },
    ]);

    if (!students || students.length === 0) {
        throw new ApiError(401, "Students not found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { students: students },
                "Students fetched successfully!"
            )
        );
});

const updateStudent = asyncHandler(async (req, res) => {
    const studentId = req.params.studentId;
    if (!studentId) {
        throw new ApiError(401, "Student not found!");
    }

    const { name, email, section } = req.body;

    const student = await User.findByIdAndUpdate(
        studentId,
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
                { success: true },
                "Student Updated SuccessFully!"
            )
        );
});

// const forgetPassword = asyncHandler(async (req, res) => {
//     const { email } = req.body;

//     const user = await User.findOne({ email, isEmailVerified: true });
//     if (!user) {
//         throw new ApiError(401, "User Not Found!");
//     }

//     const { unHashedToken, hashedToken, tokenExpiry } =
//         generateVerificationToken();

//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordTokenExpiry = tokenExpiry;

//     await user.save({ validateBeforeSave: false });

//     res.status(201).json(
//         new ApiResponse(
//             201,
//             {},
//             "Please Check Your Email Inbox To Reset Your Password!"
//         )
//     );

//     // Add Email To Queue
//     const url = verificationUrl(req, unHashedToken, "forgot");
//     await emailQueue(user.name, email, EmailSendEnum.REGISTER, url);
// });

// const resetPassword = asyncHandler(async (req, res) => {
//     const { password, resetToken } = req.body;

//     const hashedToken = cryptoTokenVerify(resetToken);

//     const user = await User.findOne({
//         resetPasswordToken: hashedToken,
//         resetPasswordTokenExpiry: { $gt: Date.now() },
//     });
//     if (!user) {
//         throw new ApiError(401, "Invalid Token!");
//     }

//     Object.assign(user, {
//         password: password,
//         resetPasswordToken: undefined,
//         resetPasswordTokenExpiry: undefined,
//     });
//     await user.save({ validateBeforeSave: false });

//     res.status(201).json(
//         new ApiResponse(201, {}, "Your password has been changed successfully!")
//     );

//     // Add Email To Queue
//     await emailQueue(user.name, user.email, EmailSendEnum.RESET_PASSWORD);
// });

// const refreshAccessToken = asyncHandler(async (req, res) => {
//     const incomingRefreshToken =
//         req.cookies.refreshToken || req.body.refreshToken;

//     if (!incomingRefreshToken) {
//         throw new ApiError(401, "Unauthorized request");
//     }

//     try {
//         const decodedToken = jwt.verify(
//             incomingRefreshToken,
//             process.env.REFRESH_TOKEN_SECRET
//         );

//         const user = await User.findOne({
//             _id: decodedToken?._id,
//             refreshToken: incomingRefreshToken,
//             isEmailVerified: true,
//         });
//         if (!user) {
//             throw new ApiError(401, "Invalid refresh token");
//         }

//         const { accessToken, refreshToken: newRefreshToken } =
//             await refreshUserTokens(user._id);

//         return res
//             .status(200)
//             .cookie("accessToken", accessToken, cookieOptions)
//             .cookie("refreshToken", newRefreshToken, cookieOptions)
//             .json(
//                 new ApiResponse(
//                     200,
//                     { accessToken, refreshToken: newRefreshToken },
//                     "Access token refreshed"
//                 )
//             );
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid refresh token");
//     }
// });

export {
    registerStudent,
    loginStudent,
    getStudent,
    getSectionStudents,
    getLectureStudents,
    getExistingStudents,
    updateStudent,
    // logoutUser,
    // updateUser,
    // forgetPassword,
    // resetPassword,
    // refreshAccessToken,
};
