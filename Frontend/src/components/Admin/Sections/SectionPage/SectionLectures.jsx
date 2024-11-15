import { useEffect } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/index";
import { LectureCard } from "@/components/Admin/LectureCard";
import { motion } from "framer-motion";
import useSectionStore from "../../../../app/useSectionStore";
import { useParams } from "react-router-dom";

const SectionLectures = () => {
    const { sectionId } = useParams();
    const { sectionLectures, fetchSectionLectures } = useSectionStore();

    useEffect(() => {
        fetchSectionLectures();
    }, [sectionId]);

    return (
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
                            ?.filter((item) => item.day.toLowerCase() === day)
                            ?.map((lecture) => (
                                <LectureCard
                                    key={lecture?._id}
                                    lecture={lecture}
                                    sectionId={sectionId}
                                />
                            ))}
                    </motion.div>
                </TabsContent>
            ))}
        </Tabs>
    );
};

export default SectionLectures;
