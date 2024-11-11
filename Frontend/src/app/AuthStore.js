import { create } from "zustand";
import { devtools } from "zustand/middleware";
import CryptoJS from "crypto-js";
import { loginAdmin, verifyUser } from "../api";

const SECRET_KEY = "your-secret-key"; // Replace with your actual secret key

const setToken = (token) => {
    const encryptedToken = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    localStorage.setItem("accessToken", encryptedToken);
};

const getToken = () => {
    const encryptedToken = localStorage.getItem("accessToken");
    if (encryptedToken) {
        const decryptedToken = CryptoJS.AES.decrypt(
            encryptedToken,
            SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);
        return decryptedToken;
    }
    return null;
};

const setRole = (token) => {
    const encryptedRole = CryptoJS.AES.encrypt(token, SECRET_KEY).toString();
    localStorage.setItem("role", encryptedRole);
};

const getRole = () => {
    const encryptedRole = localStorage.getItem("role");
    if (encryptedRole) {
        const decryptedRole = CryptoJS.AES.decrypt(
            encryptedRole,
            SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        return decryptedRole;
    }
    return null;
};

export const useAuthStore = create(
    devtools(
        (set) => ({
            user: {},
            accessToken: getToken(), // Initialize with decrypted token from localStorage
            userRole: getRole(),
            isAuthenticated: !!getToken(),
            verify: async () => {
                const response = await verifyUser();
                if (!response) {
                    return false;
                }
                set({
                    user: response,
                    role: response.role,
                    isAuthenticated: true,
                });
                return true;
            },
            loginUser: async (userData) => {
                const response = await loginAdmin(userData);
                const role = response.data.admin.role.toUpperCase();
                const accessToken = response.data.accessToken;

                setToken(accessToken);
                setRole(role);
                set({ accessToken, userRole: role, isAuthenticated: true });
            },
            logout: () => {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("role");
                set({
                    accessToken: null,
                    userRole: null,
                    isAuthenticated: false,
                    user: null,
                });
            },
        }),
        { name: "auth" }
    )
);
