import { ChevronDown, School } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="px-5 flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <School className="mr-2 h-6 w-6" />
          <span className="font-bold">College Name</span>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link to={"/"}>Dashboard</Link>
            <Link to={"/sections"}>Sections</Link>
            <Link to={"/sections/csb-34"}>CSB-34</Link>
            <Link to={"/sections/add"}>Add Section</Link>
            <Link to={"/teachers/add"}>Add Teacher</Link>
            <Link to={"/teachers/233401"}>Teacher</Link>
            <Link to={"/students"}>Students</Link>
            <Link to={"/students/233401"}>Student</Link>
            <Link to={"/students/add"}>Add Student</Link>
            <Link to={"/sections/66ffd8503e20756aec48195a/attendance/123"}>
              Attendance
            </Link>
            <Link to={"/login"}>Login</Link>
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                Admin Name
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
