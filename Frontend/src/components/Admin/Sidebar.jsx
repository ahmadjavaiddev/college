import { NavLink } from "react-router-dom";
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
} from "lucide-react";
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    Sidebar as SidebarComponent,
    SidebarContent,
    SidebarRail,
    ScrollArea,
} from "@/components/ui/index";

const sidebarItems = [
    { icon: Grid, label: "Dashboard", url: "/" },
    { icon: File, label: "Lectures", url: "/lectures" },
    { icon: Folder, label: "Sections", url: "/sections" },
    { icon: File, label: "CSB-34", url: "/sections/6727d3fecee85a1318c96571" },
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
    return (
        <SidebarComponent collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <ScrollArea className="h-[calc(100vh-2rem)]">
                        <SidebarMenu className="flex flex-col gap-2">
                            {sidebarItems.map((item) => (
                                <NavLink
                                    to={item.url}
                                    key={item.label}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "flex items-center rounded-md bg-primary text-primary-foreground shadow hover:bg-primary/90"
                                            : "flex items-center rounded-md hover:bg-accent hover:text-accent-foreground w-full"
                                    }
                                >
                                    <SidebarMenuItem
                                        tooltip={item.label}
                                        className="w-full"
                                    >
                                        <SidebarMenuButton
                                            tooltip={item.label}
                                            className="px-2 text-base font-semibold hover:bg-transparent hover:text-white-foreground"
                                        >
                                            {item.icon && (
                                                <item.icon className="h-4 w-4" />
                                            )}
                                            <span>{item.label}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </NavLink>
                            ))}
                        </SidebarMenu>
                    </ScrollArea>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </SidebarComponent>
    );
}
