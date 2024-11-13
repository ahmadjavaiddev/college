import React from "react";
import { Toaster } from "@/components/ui/toaster";

const ToastProvider = ({ children }) => {
    return (
        <>
            <Toaster />
            {children}
        </>
    );
};

export default ToastProvider;
