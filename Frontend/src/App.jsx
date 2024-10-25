import { useEffect } from "react";
import RoutePaths from "./RoutePaths";
import { useStudentsStore } from "./app/StudentsStore";
import { useSectionsStore } from "./app/SectionsStore";

function App() {
    const addStudents = useStudentsStore((state) => state.addStudents);
    const addSections = useSectionsStore((state) => state.addSections);

    useEffect(() => {
        addSections([
            {
                name: "CSB-34",
                discipline: "Computer Science",
                year: "2nd Year",
                classTeacher: "Dr. John Doe",
                totalStudents: 60,
                presentStudents: 48,
                absentStudents: 12,
            },
            {
                name: "CSB-35",
                discipline: "Computer Science",
                year: "2nd Year",
                classTeacher: "Dr. Maxwall",
                totalStudents: 60,
                presentStudents: 48,
                absentStudents: 12,
            },
            {
                name: "CSB-36",
                discipline: "Computer Science",
                year: "2nd Year",
                classTeacher: "Dr. Strange",
                totalStudents: 60,
                presentStudents: 48,
                absentStudents: 12,
            },
            {
                name: "CSB-37",
                discipline: "Computer Science",
                year: "2nd Year",
                classTeacher: "Dr. Banner",
                totalStudents: 60,
                presentStudents: 48,
                absentStudents: 12,
            },
        ]);

        addStudents([
            {
                name: "Alice Johnson",
                email: "alice@example.com",
                studentId: "CS001",
                branch: "Computer Science",
                section: "CSB-34",
                status: "PRESENT",
            },
            {
                name: "Bob Smith",
                email: "bob@example.com",
                studentId: "CS002",
                branch: "Computer Science",
                section: "CSB-34",
                status: "PRESENT",
            },
            {
                name: "Charlie Brown",
                email: "charlie@example.com",
                studentId: "CS003",
                branch: "Computer Science",
                section: "CSB-34",
                status: "PRESENT",
            },
            {
                name: "Diana Ross",
                email: "diana@example.com",
                studentId: "CS004",
                branch: "Computer Science",
                section: "CSB-34",
                status: "ABSENT",
            },
            {
                name: "Ethan Hunt",
                email: "ethan@example.com",
                studentId: "CS005",
                branch: "Computer Science",
                section: "CSB-34",
                status: "ABSENT",
            },
            {
                name: "Fiona Gallagher",
                email: "fiona@example.com",
                studentId: "CS006",
                branch: "Computer Science",
                section: "CSB-34",
                status: "ABSENT",
            },
            {
                name: "Alice Johnson",
                email: "alice@example.com",
                studentId: "CS001",
                branch: "Computer Science",
                section: "CSB-34",
                status: "PRESENT",
            },
            {
                name: "Bob Smith",
                email: "bob@example.com",
                studentId: "CS002",
                branch: "Computer Science",
                section: "CSB-35",
                status: "PRESENT",
            },
            {
                name: "Charlie Brown",
                email: "charlie@example.com",
                studentId: "CS003",
                branch: "Computer Science",
                section: "CSB-35",
                status: "ABSENT",
            },
            {
                name: "Diana Ross",
                email: "diana@example.com",
                studentId: "CS004",
                branch: "Computer Science",
                section: "CSB-35",
                status: "ABSENT",
            },
            {
                name: "Ethan Hunt",
                email: "ethan@example.com",
                studentId: "CS005",
                branch: "Computer Science",
                section: "CSB-35",
                status: "PRESENT",
            },
        ]);
    }, [addSections, addStudents]);

    return <RoutePaths />;
}

export default App;
