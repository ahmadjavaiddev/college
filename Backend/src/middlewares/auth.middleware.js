import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const verifyUserRole = (roles) => {
    return asyncHandler(async (req, res, next) => {
        try {
            if (roles.includes(req.user.role)) {
                next();
            } else {
                throw new ApiError(401, "Invalid User Role");
            }
        } catch (error) {
            throw new ApiError(401, error?.message || "Invalid User Role");
        }
    });
};

const verifyJWTUser = asyncHandler(async (req, res, next) => {
    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized request");
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findOne({
            _id: decodedToken?._id,
            role: decodedToken?.role,
        });
        if (!user) {
            throw new ApiError(401, "Invalid User Identity");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export { verifyJWTUser, verifyUserRole };
