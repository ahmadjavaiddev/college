import { Card, CardContent, Badge, Button } from "@/components/ui/index.js";
import { motion } from "framer-motion";
import { BookOpen, ChevronRight, User2, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function SectionCard({ section, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
        >
            <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <CardContent className="p-0">
                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-center">
                            <Badge
                                variant="secondary"
                                className="text-lg font-semibold px-3 py-1"
                            >
                                {section.name}
                            </Badge>
                            <Badge
                                variant={
                                    section?.status === "active"
                                        ? "success"
                                        : "destructive"
                                }
                                className="capitalize"
                            >
                                {section?.status}
                            </Badge>
                        </div>
                        <div className="space-y-4">
                            <InfoItem
                                icon={<User2 className="h-5 w-5" />}
                                label="Incharge"
                                value={`${section.incharge.firstName} ${section.incharge.lastName}`}
                            />
                            <InfoItem
                                icon={<BookOpen className="h-5 w-5" />}
                                label="Discipline"
                                value={"Computer Science"}
                            />
                            <InfoItem
                                icon={<Users className="h-5 w-5" />}
                                label="Total Students"
                                value={section.students}
                            />
                        </div>
                        <div className="pt-4 flex gap-2">
                            <Link
                                to={`/sections/${section._id}`}
                                className="w-full"
                            >
                                <Button
                                    className="w-full group text-black"
                                    variant="outline"
                                >
                                    View Details
                                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Button className="w-full">Manage Section</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-center gap-3 text-muted-foreground group">
            <div className="text-primary">{icon}</div>
            <div className="flex-grow">
                <span className="text-sm font-medium text-gray-800 dark:text-gray-400">
                    {label}:
                </span>
                <span
                    className={`ml-1 font-semibold text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors`}
                >
                    {value}
                </span>
            </div>
        </div>
    );
}
