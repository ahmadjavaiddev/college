// import { TRANSACTION_TOKEN_EXPIRY } from "../constants.js";
import crypto from "crypto";
import { ApiError } from "./ApiError.js";
import { User } from "../models/user.model.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(
            500,
            `Error generating the access token for ${type}`,
            error
        );
    }
};

const generateVerificationToken = () => {
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");

    const tokenExpiry = Date.now() + "TRANSACTION_TOKEN_EXPIRY";

    return { unHashedToken, hashedToken, tokenExpiry };
};

function isDateSame(givenDate) {
    const dateToVerify = new Date(givenDate);
    const newDate = new Date();

    const modifiedDateToVerify = `${dateToVerify.getDate()}-${dateToVerify.getMonth()}-${dateToVerify.getFullYear()}`;
    const currentDate = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;

    return currentDate === modifiedDateToVerify;
}

const verificationUrl = (req, token, type) => {
    if (!type) {
        return `${req.get("origin")}/verify/login/${token}`;
    }
    if (type === "forgot") {
        return `${req.get("origin")}/api/v1/users/reset-password/${token}`;
    }
    if (type === "transactions") {
        return `${req.get("origin")}/verify/transactions/${token}`;
    }
    if (type === "card") {
        return `${req.get("origin")}/api/v1/card/verify/${token}`;
    }
};

export function parseTime(time) {
    const [start, end] = time.split(" To ");
    return {
        start: new Date(`1970-01-01T${start}:00Z`), // Parse to Date for sorting
        end: new Date(`1970-01-01T${end}:00Z`),
    };
}

const encryptMPIN = (mpin) => {
    const key = crypto.randomBytes(32); // AES-256 requires a 32-byte key
    const iv = crypto.randomBytes(16); // AES requires a 16-byte IV

    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let encrypted = cipher.update(mpin, "utf8", "hex");
    encrypted += cipher.final("hex");
    return { encrypted, key, iv };
};

const decryptMPIN = (encryptedMPIN, key, iv) => {
    const decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
    let decrypted = decipher.update(encryptedMPIN, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};

const cryptoTokenVerify = (token) => {
    let hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    return hashedToken;
};

export {
    generateAccessAndRefreshTokens,
    generateVerificationToken,
    isDateSame,
    verificationUrl,
    encryptMPIN,
    decryptMPIN,
    cryptoTokenVerify,
};
