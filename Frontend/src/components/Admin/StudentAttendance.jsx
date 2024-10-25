import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CalendarIcon, BookOpen, CheckCircle, XCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

const generateMonthData = () => {
    return Array.from({ length: 28 }, (_, dayIndex) => ({
        day: dayIndex + 1,
        lectures: Array.from({ length: 6 }, (_, lectureIndex) => ({
            id: lectureIndex + 1,
            subject: [
                "Mathematics",
                "Physics",
                "Chemistry",
                "Biology",
                "Computer Science",
                "English",
            ][lectureIndex],
            attended: Math.random() > 0.2,
        })),
    }));
};

const monthData = generateMonthData();

// eslint-disable-next-line react/prop-types
const HexagonDay = ({ day, lectures, onClick, isSelected }) => {
    // eslint-disable-next-line react/prop-types
    const attendedLectures = lectures.filter((l) => l.attended).length;
    const fillPercentage = (attendedLectures / 6) * 100;

    return (
        <button
            onClick={onClick}
            className={`w-12 h-14 relative ${
                isSelected ? "z-10 scale-110" : "hover:z-10 hover:scale-105"
            } transition-all duration-300 ease-in-out transform`}
        >
            <svg viewBox="0 0 100 115" className="w-full h-full">
                <path
                    d="M50 0 L100 28.75 L100 86.25 L50 115 L0 86.25 L0 28.75 Z"
                    fill="#f3f4f6"
                    className="transition-all duration-300 ease-in-out"
                    opacity={0.1 + (fillPercentage / 100) * 0.9}
                />
                <text x="50" y="45" textAnchor="middle" dy=".3em" fill="#333333" fontSize="36">
                    {day}
                </text>
                <text x="50" y="75" textAnchor="middle" fill="#333333" fontSize="18">
                    {attendedLectures}/6
                </text>
            </svg>
        </button>
    );
};

export default function StudentAttendance() {
    const today = new Date().getDate();
    const [selectedDay, setSelectedDay] = useState(
        monthData.find((d) => d.day === today) || null
    );

    const weeklyData = useMemo(() => {
        const weeks = [];
        for (let i = 0; i < monthData.length; i += 7) {
            const weekDays = monthData.slice(i, i + 7);
            const totalLectures = weekDays.reduce((acc, day) => acc + day.lectures.length, 0);
            const attendedLectures = weekDays.reduce(
                (acc, day) => acc + day.lectures.filter((l) => l.attended).length,
                0
            );
            weeks.push({
                weekNumber: Math.floor(i / 7) + 1,
                days: weekDays,
                attendancePercentage: (attendedLectures / totalLectures) * 100,
            });
        }
        return weeks;
    }, []);

    const overallAttendance = useMemo(() => {
        const totalLectures = monthData.reduce((acc, day) => acc + day.lectures.length, 0);
        const attendedLectures = monthData.reduce(
            (acc, day) => acc + day.lectures.filter((l) => l.attended).length,
            0
        );
        return (attendedLectures / totalLectures) * 100;
    }, []);

    const todayData = monthData.find((d) => d.day === today) || null;

    return (
        <Card className="w-full max-w-5xl mx-auto bg-white text-gray-800">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl font-bold text-gray-800">
                            Monthly Attendance Overview
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Your academic journey week by week
                        </CardDescription>
                    </div>
                    <div className="flex space-x-4">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-[180px] justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {/* <span>From: {format(new Date(), "dd MMM yyyy")}</span> */}
                                    <span>From: {new Date().toLocaleDateString()}</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={new Date()}
                                    onSelect={(date) => console.log("From:", date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-[180px] justify-start text-left font-normal"
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>To: {new Date().toLocaleDateString()}</span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={new Date()}
                                    onSelect={(date) => console.log("To:", date)}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <p className="text-xl font-bold text-gray-800">
                                {Math.round(overallAttendance)}% Overall Attendance
                            </p>
                            <Progress
                                value={overallAttendance}
                                className="w-64 h-2 bg-gray-200"
                                // indicatorClassName="bg-teal-500"
                            />
                        </div>
                        <div className="text-right">
                            <p className="text-xl font-semibold text-gray-800">
                                {monthData.length} Days
                            </p>
                            <p className="text-gray-600">
                                {monthData.length * 6} Total Lectures
                            </p>
                        </div>
                    </div>

                    {/* Today's Attendance Section */}
                    {todayData && (
                        <motion.div
                            key={todayData.day}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="mt-4 bg-gray-100 rounded-lg p-6"
                        >
                            <h3 className="text-xl font-bold mb-4 text-gray-800">
                                Today&apos;s Attendance
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {todayData.lectures.map((lecture) => (
                                    <motion.div
                                        key={lecture.id}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className={`p-4 rounded-lg ${
                                            lecture.attended ? "bg-teal-100" : "bg-[#ff8282]"
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <BookOpen className="w-5 h-5 mr-2 text-gray-600" />
                                                <span className="font-medium text-gray-800">
                                                    {lecture.subject}
                                                </span>
                                            </div>
                                            {lecture.attended ? (
                                                <CheckCircle className="w-6 h-6 text-teal-600" />
                                            ) : (
                                                <XCircle className="w-6 h-6 text-coral-600" />
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Weeks Attendance */}
                    <Accordion type="single" collapsible className="space-y-4">
                        {weeklyData.map((week) => (
                            <AccordionItem
                                key={week.weekNumber}
                                value={`week-${week.weekNumber}`}
                            >
                                <AccordionTrigger className="bg-gray-100 rounded-lg p-4 hover:bg-gray-200">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-xl font-semibold text-gray-800">
                                            Week {week.weekNumber}
                                        </span>
                                        <div className="flex items-center space-x-4">
                                            <span className="text-lg text-gray-700">
                                                {Math.round(week.attendancePercentage)}%
                                                Attendance
                                            </span>
                                            <Progress
                                                value={week.attendancePercentage}
                                                className="w-24 h-2 bg-gray-300"
                                                // indicatorClassName="bg-teal-500"
                                            />
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="mt-4 grid grid-cols-7 gap-2 justify-items-center">
                                        {week.days.map((day) => (
                                            <HexagonDay
                                                key={day.day}
                                                day={day.day}
                                                lectures={day.lectures}
                                                onClick={() => setSelectedDay(day)}
                                                isSelected={selectedDay?.day === day.day}
                                            />
                                        ))}
                                    </div>
                                    <AnimatePresence mode="wait">
                                        {selectedDay && week.days.includes(selectedDay) && (
                                            <motion.div
                                                key={selectedDay.day}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-4 bg-gray-100 rounded-lg p-6"
                                            >
                                                <h3 className="text-xl font-bold mb-4 text-gray-800">
                                                    Day {selectedDay.day} Lectures
                                                </h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                    {selectedDay.lectures.map((lecture) => (
                                                        <motion.div
                                                            key={lecture.id}
                                                            initial={{
                                                                scale: 0.9,
                                                                opacity: 0,
                                                            }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{ duration: 0.2 }}
                                                            className={`p-4 rounded-lg ${
                                                                lecture.attended
                                                                    ? "bg-teal-100"
                                                                    : "bg-[#ff8282]"
                                                            }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center">
                                                                    <BookOpen className="w-5 h-5 mr-2 text-gray-600" />
                                                                    <span className="font-medium text-gray-800">
                                                                        {lecture.subject}
                                                                    </span>
                                                                </div>
                                                                {lecture.attended ? (
                                                                    <CheckCircle className="w-6 h-6 text-teal-600" />
                                                                ) : (
                                                                    <XCircle className="w-6 h-6 text-coral-600" />
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </CardContent>
        </Card>
    );
}
