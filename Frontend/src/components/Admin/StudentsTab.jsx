import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/index.js";
import { Input } from "@/components/ui/index.js";
import { Button } from "@/components/ui/index.js";
import { UserCard } from "./UserCard";

const students = [
    {
        name: "Alice Johnson",
        email: "alice.johnson@example.com",
        branch: "Computer Science",
        section: "CS-A",
        studentId: "CS001",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Bob Smith",
        email: "bob.smith@example.com",
        branch: "Electrical Engineering",
        section: "EE-B",
        studentId: "EE001",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Charlie Brown",
        email: "charlie.brown@example.com",
        branch: "Mechanical Engineering",
        section: "ME-C",
        studentId: "ME001",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Diana Ross",
        email: "diana.ross@example.com",
        branch: "Computer Science",
        section: "CS-B",
        studentId: "CS002",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Ethan Hunt",
        email: "ethan.hunt@example.com",
        branch: "Electrical Engineering",
        section: "EE-A",
        studentId: "EE002",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "Fiona Gallagher",
        email: "fiona.gallagher@example.com",
        branch: "Mechanical Engineering",
        section: "ME-B",
        studentId: "ME002",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
];

const StudentsTab = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <div>
                        <CardTitle>Students</CardTitle>
                        <CardDescription>List of all students in the college.</CardDescription>
                    </div>
                    <div>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Search" />
                            <Button size="sm" type="submit">
                                Search
                            </Button>
                            <Button size="sm" type="submit">
                                Add New Student
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                    {students.map((student) => (
                        <UserCard key={student.studentId} {...student} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export { StudentsTab };
