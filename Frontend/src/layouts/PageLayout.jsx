import { Outlet } from "react-router-dom";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/index";
import Sidebar from "../components/Admin/Sidebar";
import ToastProvider from "../components/Admin/ToastProvider";

const PageLayout = () => {
    return (
        <SidebarProvider>
            <Sidebar />
            <SidebarInset>
                <header className="flex bg-white sticky top-0 z-50 h-14 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                </header>
                <main className="flex flex-1 flex-col gap-4 p-0">
                    <ToastProvider duration={3000}>
                        <Outlet />
                    </ToastProvider>
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default PageLayout;
