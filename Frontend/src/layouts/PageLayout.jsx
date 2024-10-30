import { Outlet } from "react-router-dom";
import Header from "@/components/Admin/Header";
import Sidebar from "../components/Admin/Sidebar";

const PageLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar className="flex-shrink-0" />
      <main className="flex-grow overflow-auto">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default PageLayout;
