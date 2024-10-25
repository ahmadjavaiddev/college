import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, ChevronDown, ClipboardCheck, GraduationCap } from "lucide-react";

export default function StudentPortal() {
    return (
        <div className="min-h-screen bg-background">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-14 items-center">
                    <div className="mr-4 hidden md:flex">
                        <GraduationCap className="mr-2 h-6 w-6" />
                        <span className="font-bold">Student Portal</span>
                    </div>
                    <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                        <nav className="flex items-center space-x-6">
                            <Button variant="ghost">Dashboard</Button>
                            <Button variant="ghost">Lectures</Button>
                            <Button variant="ghost">Attendance</Button>
                        </nav>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                    Student Name
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
            <main className="container py-6">
                <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Lectures
                            </CardTitle>
                            <BookOpen className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">6</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Attendance Rate
                            </CardTitle>
                            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">92%</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Section</CardTitle>
                            <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Section 34</div>
                        </CardContent>
                    </Card>
                </div>
                <Tabs defaultValue="lectures" className="mt-6">
                    <TabsList>
                        <TabsTrigger value="lectures">Lecture Schedule</TabsTrigger>
                        <TabsTrigger value="attendance">Attendance Record</TabsTrigger>
                    </TabsList>
                    <TabsContent value="lectures">
                        <Card>
                            <CardHeader>
                                <CardTitle>Lecture Schedule</CardTitle>
                                <CardDescription>
                                    Your upcoming lectures for the week.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-4 gap-4 font-medium">
                                        <div>Day</div>
                                        <div>Time</div>
                                        <div>Subject</div>
                                        <div>Teacher</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>Monday</div>
                                        <div>09:00 AM</div>
                                        <div>Mathematics</div>
                                        <div>Dr. Smith</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>Tuesday</div>
                                        <div>11:00 AM</div>
                                        <div>Physics</div>
                                        <div>Prof. Johnson</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>Wednesday</div>
                                        <div>10:00 AM</div>
                                        <div>Computer Science</div>
                                        <div>Dr. Brown</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="attendance">
                        <Card>
                            <CardHeader>
                                <CardTitle>Attendance Record</CardTitle>
                                <CardDescription>
                                    Your attendance for the current semester.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-4 gap-4 font-medium">
                                        <div>Subject</div>
                                        <div>Total Classes</div>
                                        <div>Classes Attended</div>
                                        <div>Attendance Percentage</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>Mathematics</div>
                                        <div>20</div>
                                        <div>18</div>
                                        <div>90%</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>Physics</div>
                                        <div>18</div>
                                        <div>17</div>
                                        <div>94%</div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>Computer Science</div>
                                        <div>22</div>
                                        <div>20</div>
                                        <div>91%</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
