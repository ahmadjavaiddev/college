import { Calendar as CalendarIcon, Eye as EyeIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function ResultCard() {
    const recentTests = [
        {
            testName: "Weekly Test",
            testId: "#4",
            startDate: "July 20",
            endDate: "July 26",
            totalMarks: 300,
            totalMarksTaken: 246,
            results: [
                { date: "July 26", title: "Computer", totalMarks: 100, totalMarksTaken: 92 },
                { date: "July 27", title: "Physics", totalMarks: 100, totalMarksTaken: 82 },
                { date: "July 28", title: "English", totalMarks: 100, totalMarksTaken: 72 },
            ],
        },
        {
            testName: "Weekly Test",
            testId: "#5",
            startDate: "July 20",
            endDate: "July 26",
            totalMarks: 300,
            totalMarksTaken: 246,
            results: [
                { date: "July 26", title: "Computer", totalMarks: 100, totalMarksTaken: 92 },
                { date: "July 27", title: "Physics", totalMarks: 100, totalMarksTaken: 82 },
                { date: "July 28", title: "English", totalMarks: 100, totalMarksTaken: 56 },
            ],
        },
        {
            testName: "Weekly Test",
            testId: "#6",
            startDate: "July 20",
            endDate: "July 26",
            totalMarks: 300,
            totalMarksTaken: 246,
            results: [
                { date: "July 26", title: "Computer", totalMarks: 100, totalMarksTaken: 92 },
                { date: "July 27", title: "Physics", totalMarks: 100, totalMarksTaken: 82 },
                { date: "July 28", title: "English", totalMarks: 100, totalMarksTaken: 56 },
            ],
        },
        {
            testName: "Weekly Test",
            testId: "#7",
            startDate: "July 20",
            endDate: "July 26",
            totalMarks: 300,
            totalMarksTaken: 246,
            results: [
                { date: "July 26", title: "Computer", totalMarks: 100, totalMarksTaken: 92 },
                { date: "July 27", title: "Physics", totalMarks: 100, totalMarksTaken: 82 },
                { date: "July 28", title: "English", totalMarks: 100, totalMarksTaken: 56 },
            ],
        },
    ];

    return (
        <AnimatePresence>
            {recentTests.map((item) => (
                <motion.div
                    key={item.testId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <Card className="w-full mb-5">
                        <CardHeader className="flex flex-row justify-between items-center bg-[#f4f4f5] py-3 rounded-t-xl">
                            <CardTitle className="flex items-center space-x-2">
                                <CalendarIcon className="w-5 h-5" />
                                <span className="font-semibold">
                                    {item.testName} - {item.testId}
                                </span>
                                <span className="text-sm font-semibold">
                                    {item.startDate} - {item.endDate}
                                </span>
                            </CardTitle>
                            <span className="text-lg font-semibold">
                                {item.totalMarksTaken}/{item.totalMarks}
                            </span>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="relative pl-8 border-l border-gray-200">
                                {item.results.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center mb-8 last:mb-0"
                                    >
                                        <div className="flex items-center mb-1">
                                            <div className="absolute left-0 w-4 h-4 bg-white border-2 border-gray-300 rounded-full -translate-x-[9px]" />
                                            <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mr-4">
                                                <span className="text-xs font-bold text-gray-600">
                                                    {item.date.split(" ")[0]}
                                                </span>
                                                <span className="text-sm font-bold text-gray-800">
                                                    {item.date.split(" ")[1]}
                                                </span>
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="flex gap-3 items-center">
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {item.totalMarksTaken}/{item.totalMarks}
                                            </h3>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="px-3 py-0"
                                            >
                                                <EyeIcon className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </AnimatePresence>
    );
}
