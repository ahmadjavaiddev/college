import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BookOpen, School, Users } from "lucide-react";
import { StudentsTab } from "../../components/Admin/studentsTab";
import TeachersTab from "../../components/Admin/TeacherTab";
import { SectionsTab } from "../../components/Admin/SectionsTab";

export default function AdminPortal() {
    // const [selectedBranch, setSelectedBranch] = useState("");

    return (
        <div className="min-h-screen bg-background">
            <main className="px-5 py-6">
                <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

                <Tabs defaultValue="manage" className="mt-6">
                    <TabsList>
                        <TabsTrigger value="manage">Manage</TabsTrigger>
                        <TabsTrigger value="teachers">Teachers</TabsTrigger>
                        <TabsTrigger value="students">Students</TabsTrigger>
                        <TabsTrigger value="lectures">Lectures</TabsTrigger>
                        <TabsTrigger value="sections">Sections</TabsTrigger>
                    </TabsList>
                    <TabsContent value="manage">
                        <Card>
                            <CardHeader>
                                <CardTitle>Manage Branches, Teachers, and Students</CardTitle>
                                <CardDescription>
                                    Add or edit branches, teachers, and students.
                                </CardDescription>
                            </CardHeader>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-5 pb-7">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Branches
                                        </CardTitle>
                                        <School className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">12</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Teachers
                                        </CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">120</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Students
                                        </CardTitle>
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">1,234</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            Total Lectures
                                        </CardTitle>
                                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">450</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </Card>
                        {/* <Card>
                            <CardHeader>
                                <CardTitle>Manage Branches, Teachers, and Students</CardTitle>
                                <CardDescription>
                                    Add or edit branches, teachers, and students.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="branch">Select Branch</Label>
                                        <Select
                                            value={selectedBranch}
                                            onValueChange={setSelectedBranch}
                                        >
                                            <SelectTrigger id="branch">
                                                <SelectValue placeholder="Select branch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="cs">
                                                    Computer Science
                                                </SelectItem>
                                                <SelectItem value="ee">
                                                    Electrical Engineering
                                                </SelectItem>
                                                <SelectItem value="me">
                                                    Mechanical Engineering
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-4">
                                        <div>
                                            <Label htmlFor="teacherName">Teacher Name</Label>
                                            <Input
                                                id="teacherName"
                                                placeholder="Enter teacher name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="teacherEmail">Teacher Email</Label>
                                            <Input
                                                id="teacherEmail"
                                                placeholder="Enter teacher email"
                                                type="email"
                                            />
                                        </div>
                                        <Button>Add Teacher</Button>
                                    </div>
                                    <div className="grid gap-4">
                                        <div>
                                            <Label htmlFor="studentName">Student Name</Label>
                                            <Input
                                                id="studentName"
                                                placeholder="Enter student name"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="studentEmail">Student Email</Label>
                                            <Input
                                                id="studentEmail"
                                                placeholder="Enter student email"
                                                type="email"
                                            />
                                        </div>
                                        <Button>Add Student</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card> */}
                    </TabsContent>
                    <TabsContent value="teachers">
                        <TeachersTab />
                    </TabsContent>
                    <TabsContent value="students">
                        <StudentsTab />
                    </TabsContent>
                    <TabsContent value="lectures">
                        <Card>
                            <CardHeader>
                                <CardTitle>Lectures</CardTitle>
                                <CardDescription>
                                    List of all scheduled lectures.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Subject</TableHead>
                                            <TableHead>Teacher</TableHead>
                                            <TableHead>Section</TableHead>
                                            <TableHead>Day</TableHead>
                                            <TableHead>Time</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>Data Structures</TableCell>
                                            <TableCell>John Doe</TableCell>
                                            <TableCell>CS-A</TableCell>
                                            <TableCell>Monday</TableCell>
                                            <TableCell>09:00 AM</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Circuit Theory</TableCell>
                                            <TableCell>Jane Smith</TableCell>
                                            <TableCell>EE-B</TableCell>
                                            <TableCell>Tuesday</TableCell>
                                            <TableCell>11:00 AM</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Thermodynamics</TableCell>
                                            <TableCell>Bob Johnson</TableCell>
                                            <TableCell>ME-C</TableCell>
                                            <TableCell>Wednesday</TableCell>
                                            <TableCell>02:00 PM</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="sections">
                        <SectionsTab />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
