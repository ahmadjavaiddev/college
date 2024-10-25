import { Outlet } from "react-router-dom";
import Header from "@/components/Admin/Header";

const PageLayout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default PageLayout;
