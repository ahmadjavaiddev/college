import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Grid,
  Folder,
  File,
  PlusSquare,
  UserPlus,
  UserCheck,
  Users,
  User,
  CheckSquare,
  LogIn,
  Menu,
  Pin,
  PinOff,
} from "lucide-react";
import { Link } from "react-router-dom";

const sidebarItems = [
  { icon: Grid, label: "Dashboard", url: "/" },
  { icon: Folder, label: "Sections", url: "/sections" },
  { icon: File, label: "CSB-34", url: "/sections/66ffd8503e20756aec48195a" },
  { icon: PlusSquare, label: "Add Section", url: "/sections/add" },
  { icon: UserPlus, label: "Add Teacher", url: "/teachers/add" },
  { icon: UserCheck, label: "Teacher", url: "/teachers/233401" },
  { icon: Users, label: "Students", url: "/students" },
  { icon: User, label: "Student", url: "/students/233401" },
  { icon: UserPlus, label: "Add Student", url: "/students/add" },
  {
    icon: CheckSquare,
    label: "Attendance",
    url: "/sections/66ffd8503e20756aec48195a/attendance/123",
  },
  { icon: LogIn, label: "Login", url: "/login" },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleSidebar = () => setIsExpanded(!isExpanded);

  const handleStickySidebar = () => {
    setIsSticky(!isSticky);
    setIsExpanded(!isSticky);
    localStorage.setItem("sticky", !isSticky);
  };

  useEffect(() => {
    const localStateofSidebar = JSON.parse(localStorage.getItem("sticky"));
    if (localStateofSidebar) {
      setIsSticky(localStateofSidebar);
      setIsExpanded(localStateofSidebar);
    }
  }, []);

  return (
    <div
      className={`flex flex-col h-screen bg-background border-r transition-all duration-500 ease-linear ${
        isExpanded || isSticky ? "w-64" : "w-16"
      }`}
      onMouseEnter={() => !isSticky && setIsExpanded(true)}
      onMouseLeave={() => !isSticky && setIsExpanded(false)}
    >
      <div className="sticky top-0 z-40 bg-background p-4 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          className={`${isExpanded && "md:hidden"}`}
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>
        {isExpanded && (
          <>
            <h2 className="text-lg font-semibold">Menu</h2>
            <Button variant="ghost" size="icon" onClick={handleStickySidebar}>
              {isSticky ? (
                <PinOff
                  className="h-5 w-5"
                  style={{ transform: "rotate(45deg)" }}
                />
              ) : (
                <Pin
                  className="h-5 w-5"
                  style={{ transform: "rotate(45deg)" }}
                />
              )}
            </Button>
          </>
        )}
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 px-2 flex flex-col">
          {sidebarItems.map((item) => (
            <Link to={item.url} key={item.label}>
              <Button
                key={item.label}
                variant="ghost"
                className={`w-full justify-start ${
                  isExpanded ? "px-4" : "px-2"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {isExpanded && <span className="ml-2">{item.label}</span>}
              </Button>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
