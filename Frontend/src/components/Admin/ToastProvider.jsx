import React from "react";
import { Toaster } from "@/components/ui/toaster";

const ToastProvider = ({ children }) => {
    return (
        <div>
            <Toaster />
            {children}
        </div>
    );
};

export default ToastProvider;
