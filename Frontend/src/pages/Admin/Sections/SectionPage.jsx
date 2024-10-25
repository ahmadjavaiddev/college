import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCard } from "@/components/Admin/UserCard";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ChartContainer } from "@/components/ui/chart";
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";
import { Badge } from "@/components/ui/badge";
import { RefreshCcw } from "lucide-react";
import { LectureCard } from "@/components/Admin/LectureCard";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AddStudent as AddStudentComponent } from "../Students/AddStudent";
import { motion } from "framer-motion";
import { getSectionDetails, getSectionLectures, getSectionStudents } from "../../../api/index";
import { Skeleton } from "@/components/ui/skeleton";
import SidebarLoading from "../../../components/Admin/SidebarLoading";

const CHART_DATA = [{ browser: "safari", visitors: 200, fill: "var(--color-safari)" }];
const CHART_CONFIG = {
    visitors: {
        label: "Visitors",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
};

export default function SectionPage() {
    const [activeTab, setActiveTab] = useState("students");
    const [studentsStatus, setStudentsStatus] = useState("");
    const [students, setStudents] = useState([]);
    const [sectionDetails, setSectionDetails] = useState({});
    const [sectionLectures, setSectionLectures] = useState([]);
    const [searchedStudents, setSearchedStudents] = useState([]);
    const [loading, setLoading] = useState({
        sectionLoading: true,
        studentsLoading: true,
        lecturesLoading: true,
    });

    const handleSearch = (query) => {
        console.log("query ::", query);
        const filteredStudents = students.filter((student) =>
            student.firstName.toLowerCase().includes(query.toLowerCase())
        );
        setSearchedStudents(filteredStudents);
    };

    const getDetails = async () => {
        try {
            setLoading({
                sectionLoading: true,
                studentsLoading: true,
                lecturesLoading: true,
            });
            const sectionResponse = await getSectionDetails();
            const studentsResponse = await getSectionStudents("66ffd8503e20756aec48195a");
            const lecturesResponse = await getSectionLectures();

            setSectionDetails(sectionResponse);
            setStudents(studentsResponse);
            setSectionLectures(lecturesResponse);

            setLoading({
                sectionLoading: false,
                studentsLoading: false,
                lecturesLoading: false,
            });
        } catch (error) {
            console.log("Error :: Get Details ::", error);
        }
    };

    useEffect(() => {
        getDetails();
    }, []);

    const renderChartLabel = ({ viewBox }) => {
        if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return null;

        return (
            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                <tspan
                    x={viewBox.cx}
                    y={viewBox.cy}
                    className="fill-foreground text-4xl font-bold"
                >
                    {`${Math.floor(Math.random() * 200)}`}
                    {/* {CHART_DATA[0].visitors.toLocaleString()} */}
                </tspan>
                <tspan
                    x={viewBox.cx}
                    y={(viewBox.cy || 0) + 24}
                    className="fill-muted-foreground"
                >
                    Attendance
                </tspan>
            </text>
        );
    };

    if (!sectionDetails) {
        return <div className="flex justify-center">Nothing Found</div>;
    }

    return (
        <div className="container mx-auto px-10 py-6">
            <div className="flex justify-between align-middle items-start gap-6">
                <Card className="sticky top-16 w-[20%]">
                    <CardHeader className="flex flex-row gap-4 items-center">
                        {loading.sectionLoading ? (
                            <div className="flex items-center space-x-4">
                                <Skeleton className="h-12 w-12 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-[150px]" />
                                    <Skeleton className="h-4 w-[100px]" />
                                </div>
                            </div>
                        ) : (
                            <>
                                <Avatar className="h-14 w-14">
                                    <AvatarImage
                                        src={"/placeholder.svg?height=40&width=40"}
                                        alt={sectionDetails?.name}
                                    />
                                    <AvatarFallback>{sectionDetails?.name}</AvatarFallback>
                                </Avatar>

                                <div className="flex flex-col">
                                    <CardTitle className="text-lg">
                                        {sectionDetails?.name}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">
                                        {sectionDetails?.name}
                                    </p>
                                </div>
                            </>
                        )}
                    </CardHeader>
                    <CardContent>
                        <div>
                            {loading.sectionLoading ? (
                                <SidebarLoading />
                            ) : (
                                <>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Incharge:</span>
                                        <Badge
                                            variant="outline"
                                            className={`text-sm rounded-xl px-3 py-0 mt-1 font-bold`}
                                        >
                                            {sectionDetails?.incharge?.name}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Branch:</span>
                                        <Badge
                                            variant="outline"
                                            className={`text-sm rounded-xl px-3 py-0 mt-1 font-bold`}
                                        >
                                            {sectionDetails?.branch?.name}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Total Students:</span>
                                        <Badge
                                            variant="outline"
                                            className={`text-sm rounded-xl px-3 py-0 mt-1 font-bold`}
                                        >
                                            68
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Present Students:</span>
                                        <Badge
                                            variant="outline"
                                            className={`text-sm rounded-xl px-3 py-0 mt-1 font-bold bg-[#229588] text-white`}
                                        >
                                            45
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="font-medium">Absent Students:</span>
                                        <Badge
                                            variant="outline"
                                            className={`text-sm rounded-xl px-3 py-0 mt-1 font-bold bg-red-600 text-white`}
                                        >
                                            9
                                        </Badge>
                                    </div>
                                </>
                            )}
                        </div>
                        {[...Array(2)].map((_, index) => (
                            <ChartContainer
                                key={index}
                                config={CHART_CONFIG}
                                className={`${
                                    index === 0 ? "mt-8" : ""
                                } mx-auto aspect-square max-h-[250px]`}
                            >
                                <RadialBarChart
                                    data={CHART_DATA}
                                    startAngle={0}
                                    endAngle={250}
                                    innerRadius={80}
                                    outerRadius={110}
                                >
                                    <PolarGrid
                                        gridType="circle"
                                        radialLines={false}
                                        stroke="none"
                                        className="first:fill-muted last:fill-background"
                                        polarRadius={[86, 74]}
                                    />
                                    <RadialBar
                                        dataKey="visitors"
                                        background
                                        cornerRadius={10}
                                    />
                                    <PolarRadiusAxis
                                        tick={false}
                                        tickLine={false}
                                        axisLine={false}
                                    >
                                        <Label content={renderChartLabel} />
                                    </PolarRadiusAxis>
                                </RadialBarChart>
                            </ChartContainer>
                        ))}
                    </CardContent>
                </Card>
                <Card className="px-5 py-3 w-[80%]">
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <div className="flex justify-between">
                            <TabsList>
                                <TabsTrigger value="students">Students</TabsTrigger>
                                <TabsTrigger value="lectures">Lectures</TabsTrigger>
                            </TabsList>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mr-2"
                                onClick={getDetails}
                            >
                                <RefreshCcw width={18} />
                            </Button>
                        </div>

                        <TabsContent value="students" className="space-y-4">
                            <div className="flex justify-between mt-3 mb-7 px-2">
                                <CardTitle className="text-xl">Students</CardTitle>

                                <div>
                                    {["Present", "Absent", "Leave", "Short Leave"].map(
                                        (status) => (
                                            <Button
                                                key={status}
                                                variant="outline"
                                                className={`mx-1 px-3 py-1 ${
                                                    studentsStatus?.toLowerCase() ===
                                                        status?.toLowerCase() &&
                                                    "bg-black text-white"
                                                }`}
                                                onClick={() =>
                                                    setStudentsStatus(status.toLowerCase())
                                                }
                                            >
                                                {status}
                                            </Button>
                                        )
                                    )}
                                    <Button
                                        variant="outline"
                                        className="mx-1 px-3 py-1"
                                        onClick={() => setStudentsStatus("")}
                                    >
                                        Clear
                                    </Button>
                                </div>
                                <div>
                                    <div className="flex w-full items-center space-x-2">
                                        <Input
                                            type="text"
                                            placeholder="Search"
                                            onChange={(e) => handleSearch(e.target.value)}
                                        />
                                        {/* <Button size="sm" type="submit">
                                            Search
                                        </Button> */}
                                        <Dialog>
                                            <DialogTrigger className="w-full bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 h-8 rounded-md px-0 text-xs">
                                                Add New Student
                                            </DialogTrigger>
                                            <DialogContent className="max-w-5xl py-0 pb-5">
                                                <DialogTitle className="w-0 h-0 p-0 m-0 text-sm"></DialogTitle>
                                                <AddStudentComponent
                                                    sectionIdToSelect={sectionDetails._id}
                                                />
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </div>
                            </div>
                            {studentsStatus && (
                                <div>
                                    Number of
                                    <b className="mx-1">
                                        {studentsStatus.charAt(0).toUpperCase() +
                                            studentsStatus.slice(1)}
                                    </b>
                                    Students are <b>{students.length}</b>
                                </div>
                            )}

                            {loading.studentsLoading ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-3"
                                >
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <Card key={item} className="py-4 px-4">
                                            <div className="flex items-center space-x-4 mb-8">
                                                <Skeleton className="h-12 w-12 rounded-full" />
                                                <div className="space-y-2">
                                                    <Skeleton className="h-4 w-[180px]" />
                                                    <Skeleton className="h-4 w-[130px]" />
                                                </div>
                                            </div>
                                            {[1, 2].map((item) => (
                                                <div key={item} className="mb-3">
                                                    <div className="flex justify-between mb-2">
                                                        <Skeleton className="h-4 w-[150px]" />
                                                        <Skeleton className="h-4 w-[100px]" />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <Skeleton className="h-4 w-[100px]" />
                                                        <Skeleton className="h-4 w-[80px]" />
                                                    </div>
                                                </div>
                                            ))}
                                            <Skeleton className="mt-2 h-7 w-full" />
                                        </Card>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-3"
                                >
                                    {searchedStudents.length > 0
                                        ? searchedStudents.map((student) => (
                                              <UserCard key={student._id} {...student} />
                                          ))
                                        : students.map((student) => (
                                              <UserCard key={student._id} {...student} />
                                          ))}
                                </motion.div>
                            )}
                        </TabsContent>
                        <TabsContent value="lectures">
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
                                            <TabsTrigger value={day.toLowerCase()} key={day}>
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
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-3"
                                        >
                                            {sectionLectures
                                                .filter(
                                                    (item) => item.day.toLowerCase() === day
                                                ) // Filter the lectures for the given day
                                                .flatMap((item) => item.subjects) // Flatten the subjects array
                                                .map((lecture) => (
                                                    <LectureCard
                                                        key={lecture._id}
                                                        {...lecture}
                                                    />
                                                ))}
                                        </motion.div>
                                    </TabsContent>
                                ))}
                            </Tabs>
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
}
