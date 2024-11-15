import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap } from "lucide-react";
import { LectureCard } from "../../../components/Admin/LectureCard";
import ResultCard from "../../../components/Admin/ResultCard";
import { StudentProgressChart } from "../../../components/Admin/StudentProgressChart";
import StudentAttendance from "../../../components/Admin/StudentAttendance";
import { useLoaderData } from "react-router-dom";
import { useStudentProfileStore } from "../../../app/StudentProfileStore";

const recentTests = [
    { subject: "Data Structures", score: 95, maxScore: 100, grade: "A" },
    { subject: "Algorithms", score: 88, maxScore: 100, grade: "B+" },
    { subject: "Database Systems", score: 92, maxScore: 100, grade: "A-" },
    { subject: "Web Development", score: 98, maxScore: 100, grade: "A+" },
];

export default function StudentProfile() {
    const student = useLoaderData();

    const LECTURES = [
        {
            subject: "Data Structures",
            teacher: "Dr. Alice Wonder",
            day: "Monday",
            startTime: "09:00 AM",
            endTime: "10:30 AM",
        },
        {
            subject: "Operating Systems",
            teacher: "Dr. Ethan Kernel",
            day: "Friday",
            startTime: "01:00 PM",
            endTime: "02:30 PM",
        },
        {
            subject: "Operating Systems",
            teacher: "Dr. Ethan Kernel",
            day: "Saturday",
            startTime: "01:00 PM",
            endTime: "02:30 PM",
        },
        {
            subject: "Computer Networks",
            teacher: "Prof. Diana Connect",
            day: "Tuesday",
            startTime: "10:00 AM",
            endTime: "11:30 AM",
        },
        {
            subject: "Algorithms",
            teacher: "Prof. Bob Sage",
            day: "Wednesday",
            startTime: "11:00 AM",
            endTime: "12:30 PM",
        },
        {
            subject: "Operating Systems",
            teacher: "Dr. Ethan Kernel",
            day: "Thursday",
            startTime: "01:00 PM",
            endTime: "02:30 PM",
        },
    ];

    return (
        <div className="w-[900px] mx-auto p-6">
            <Card>
                <CardHeader className="pb-4 flex flex-row justify-between items-center">
                    <div className="flex items-center space-x-4 w-[80%]">
                        <Avatar className="w-20 h-20">
                            <AvatarImage
                                src={student?.image}
                                alt={student?.firstName}
                            />
                            <AvatarFallback>
                                {student?.firstName?.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl">
                                {student?.firstName} {student?.lastName}
                            </CardTitle>
                            <p className="text-gray-500">{student?.email}</p>
                            <div className="flex items-center mt-2 text-sm text-gray-500">
                                <GraduationCap className="w-4 h-4 mr-1" />
                                {student?.firstName}, {student?.year?.name}
                            </div>
                        </div>
                    </div>

                    <div className="w-[20%] flex flex-row justify-center items-center">
                        <StudentProgressChart />
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="overview" className="mt-6">
                        <TabsList
                            className="grid w-full grid-cols-4 sticky top-16 transition-colors duration-200"
                            style={{
                                zIndex: 55,
                            }}
                        >
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="attendance">
                                Attendance
                            </TabsTrigger>
                            <TabsTrigger value="lectures">Lectures</TabsTrigger>
                            <TabsTrigger value="tests">
                                Recent Tests
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="mt-6">
                            <ResultCard />
                        </TabsContent>
                        <TabsContent value="attendance" className="mt-6">
                            <StudentAttendance />
                        </TabsContent>
                        <TabsContent value="lectures" className="mt-6">
                            <Tabs defaultValue="monday">
                                <div className="flex justify-center">
                                    <TabsList>
                                        {[
                                            "Monday",
                                            "Tuesday",
                                            "Wednesday",
                                            "Thursday",
                                            "Friday",
                                            "Saturday",
                                        ].map((day) => (
                                            <TabsTrigger
                                                value={day.toLowerCase()}
                                                key={day}
                                            >
                                                {day}
                                            </TabsTrigger>
                                        ))}
                                    </TabsList>
                                </div>

                                {[
                                    "monday",
                                    "tuesday",
                                    "wednesday",
                                    "thursday",
                                    "friday",
                                    "saturday",
                                ].map((day) => (
                                    <TabsContent key={day} value={day}>
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-5 mb-3">
                                            {LECTURES.filter(
                                                (item) =>
                                                    item.day.toLowerCase() ===
                                                    day
                                            ).map((lecture, index) => (
                                                <LectureCard
                                                    key={index}
                                                    {...lecture}
                                                />
                                            ))}
                                        </div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </TabsContent>
                        <TabsContent value="tests" className="mt-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                {recentTests?.map((test, index) => (
                                    <Card key={index}>
                                        <CardHeader className="pb-2">
                                            <CardTitle>
                                                {test.subject}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="text-2xl font-bold">
                                                    {test.score}/{test.maxScore}
                                                </div>
                                                <div className="text-lg font-semibold text-muted-foreground">
                                                    {test.grade}
                                                </div>
                                            </div>
                                            <Progress
                                                value={
                                                    (test.score /
                                                        test.maxScore) *
                                                    100
                                                }
                                                className="mt-2"
                                            />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
}

export async function loadStudentData(studentId) {
    const { fetchStudent } = useStudentProfileStore.getState();
    const response = await fetchStudent(studentId);
    if (response) {
        return response;
    }
}
