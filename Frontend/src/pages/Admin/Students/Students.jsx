// import { CardTitle, CardDescription } from "@/components/ui/Card";
import { Input, Button } from "@/components/ui/index.js";
// import { Button } from "@/components/ui/Button";
import { UserCard } from "../../../components/Admin/UserCard";

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

const Students = () => {
    return (
        <div className="px-10 py-8">
            <div className="flex justify-between mb-7">
                <div>
                    <CardTitle className="text-xl">Students</CardTitle>
                    <CardDescription>
                        List of all Students in the college.
                    </CardDescription>
                </div>
                <div>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input type="text" placeholder="Search" />
                        <Button size="sm" type="submit">
                            Search
                        </Button>
                        <Button size="sm" type="submit">
                            Add New Students
                        </Button>
                    </div>
                </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                {students.map((student) => (
                    <UserCard key={student.studentId} {...student} />
                ))}
            </div>
        </div>
    );
};

export default Students;
