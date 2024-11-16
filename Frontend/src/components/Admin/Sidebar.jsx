import { NavLink } from "react-router-dom";
import {
    Folder,
    PlusSquare,
    UserPlus,
    Users,
    LogIn,
    LayoutDashboard,
    BookOpen,
    GraduationCap,
    ClipboardList,
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
    { icon: LayoutDashboard, label: "Dashboard", url: "/" },
    { icon: BookOpen, label: "Lectures", url: "/lectures" },
    { icon: Folder, label: "Sections", url: "/sections" },
    { icon: PlusSquare, label: "Add Section", url: "/sections/add" },
    { icon: UserPlus, label: "Add Teacher", url: "/teachers/add" },
    { icon: GraduationCap, label: "Teacher", url: "/teachers/233401" },
    { icon: Users, label: "Students", url: "/students" },
    { icon: UserPlus, label: "Add Student", url: "/students/add" },
    {
        icon: ClipboardList,
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
