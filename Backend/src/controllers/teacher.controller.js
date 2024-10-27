import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { generateAccessAndRefreshTokens } from "../utils/index.js";
import { cookieOptions } from "../constants.js";
import { Branch } from "../models/branch.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerTeacher = asyncHandler(async (req, res) => {
    const { firstName, lastName, email, subject } = req.body;

    const existingTeacher = await User.findOne({ email });
    if (existingTeacher) {
        throw new ApiError(409, "Teacher with email already exists");
    }

    const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
    const teacher = await User.create({
        firstName,
        lastName,
        email,
        password: "123",
        subject,
        branch: req.user.branch,
        role: "TEACHER",
        image: cloudinaryResponse.secure_url,
    });
    await Branch.findByIdAndUpdate(req.user.branch, {
        $push: { teachers: teacher._id },
    });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { success: true },
                "Teacher Registered Successfully!"
            )
        );
});

const loginTeacher = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const teacher = await User.findOne({ email });
    if (!teacher) {
        throw new ApiError(404, "Teacher not found!");
    }

    const isValidPassword = await teacher.isPasswordCorrect(password);
    if (!isValidPassword) {
        throw new ApiError(401, "Invalid password!");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        teacher._id
    );
    const loggedInTeacher = await User.findById(teacher._id).select(
        "-password -refreshToken -updatedAt -__v"
    );

    return res
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .status(200)
        .json(
            new ApiResponse(
                200,
                {
                    teacher: loggedInTeacher,
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
                "Teacher logged in successfully!"
            )
        );
});

const getTeacher = asyncHandler(async (req, res) => {
    const teacher = await User.findById(req.params.teacherId)
        .populate({
            path: "lectures",
            select: "subject day time",
            populate: {
                path: "section",
                select: "name code",
            },
        })
        .select("-password -refreshToken -updatedAt -__v");

    if (!teacher) {
        throw new ApiError(404, "Teacher not found!");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { teacher: teacher },
                "Teacher fetched successfully"
            )
        );
});

const logoutTeacher = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.teacher._id,
        {
            $set: {
                refreshToken: "",
            },
        },
        { new: true }
    );

    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .clearCookie("refreshToken", cookieOptions)
        .json(new ApiResponse(200, {}, "Teacher logged out"));
});

const updateTeacher = asyncHandler(async (req, res) => {
    const teacherId = req.teacher._id;
    if (!teacherId) {
        throw new ApiError(401, "Teacher not found!");
    }

    const { name, email, subject, branch } = req.body;

    const teacher = await User.findByIdAndUpdate(
        teacherId,
        {
            $set: {
                name: name,
                email: email,
                subject: subject,
                branch: branch,
            },
        },
        {
            new: true,
        }
    ).select("-password -refreshToken -updatedAt -__v");

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { teacher: teacher },
                "Teacher Updated Successfully!"
            )
        );
});

// const forgetPassword = asyncHandler(async (req, res) => {
//     const { email } = req.body;

//     const teacher = await User.findOne({ email, isEmailVerified: true });
//     if (!teacher) {
//         throw new ApiError(401, "Teacher Not Found!");
//     }

//     const { unHashedToken, hashedToken, tokenExpiry } =
//         generateVerificationToken();

//     teacher.resetPasswordToken = hashedToken;
//     teacher.resetPasswordTokenExpiry = tokenExpiry;

//     await teacher.save({ validateBeforeSave: false });

//     res.status(201).json(
//         new ApiResponse(
//             201,
//             {},
//             "Please Check Your Email Inbox To Reset Your Password!"
//         )
//     );

//     // Add Email To Queue
//     const url = verificationUrl(req, unHashedToken, "forgot");
//     await emailQueue(teacher.name, email, EmailSendEnum.RESET_PASSWORD, url);
// });

// const resetPassword = asyncHandler(async (req, res) => {
//     const { password, resetToken } = req.body;

//     const hashedToken = cryptoTokenVerify(resetToken);

//     const teacher = await User.findOne({
//         resetPasswordToken: hashedToken,
//         resetPasswordTokenExpiry: { $gt: Date.now() },
//     });
//     if (!teacher) {
//         throw new ApiError(401, "Invalid Token!");
//     }

//     Object.assign(teacher, {
//         password: password,
//         resetPasswordToken: undefined,
//         resetPasswordTokenExpiry: undefined,
//     });
//     await teacher.save({ validateBeforeSave: false });

//     res.status(201).json(
//         new ApiResponse(201, {}, "Your password has been changed successfully!")
//     );

//     // Add Email To Queue
//     await emailQueue(
//         teacher.name,
//         teacher.email,
//         EmailSendEnum.PASSWORD_CHANGED
//     );
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

//         const teacher = await User.findOne({
//             _id: decodedToken?._id,
//             refreshToken: incomingRefreshToken,
//             isEmailVerified: true,
//         });
//         if (!teacher) {
//             throw new ApiError(401, "Invalid refresh token");
//         }

//         const { accessToken, refreshToken: newRefreshToken } =
//             await refreshUserTokens(teacher._id);

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
    registerTeacher,
    loginTeacher,
    getTeacher,
    logoutTeacher,
    updateTeacher,
    // forgetPassword,
    // resetPassword,
    // refreshAccessToken,
};
