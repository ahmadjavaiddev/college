import { useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    ScrollArea,
} from "@/components/ui/index.js";
import useLectureStore from "@/app/useLectureStore";
import LecturesCard from "@/components/Admin/Lectures/LecturesCard";
import EditLecture from "@/components/Admin/Lectures/EditLecture";
import { GraduationCap } from "lucide-react";

export default function Lectures() {
    const {
        loading,
        fetchLectures,
        fetchSections,
        sections,
        selectedSection,
        selectedLecture,
        setSelectedSection,
        editingLecture,
        showChangesButton,
        newArrangment,
        setSelectedLecture,
    } = useLectureStore();

    useEffect(() => {
        fetchSections();
    }, []);

    const handleSectionSelect = (sectionId) => {
        setSelectedSection(sectionId);
        fetchLectures(sectionId);
        if (selectedSection !== editingLecture.section) {
            setSelectedLecture(null);
        }
    };

    return (
        <div className="flex h-[93vh] bg-gray-100">
            <Card className="w-1/4 m-4 overflow-hidden">
                <CardHeader>
                    <CardTitle>Sections</CardTitle>
                </CardHeader>
                <CardContent>
                    <ScrollArea className="h-[calc(100vh-8rem)]">
                        {loading.sections ? (
                            <div className="flex justify-center items-center h-full">
                                <p>Loading...</p>
                            </div>
                        ) : (
                            sections?.map((section) => (
                                <Button
                                    key={section?._id}
                                    variant={
                                        selectedSection === section?._id
                                            ? "default"
                                            : "ghost"
                                    }
                                    className="w-full justify-start mb-2"
                                    disabled={
                                        showChangesButton &&
                                        newArrangment.length > 0
                                            ? true
                                            : false
                                    }
                                    onClick={() => {
                                        handleSectionSelect(section?._id);
                                    }}
                                >
                                    <GraduationCap className="mr-2 h-4 w-4" />
                                    {section?.name}
                                </Button>
                            ))
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>

            {selectedSection && <LecturesCard />}

            {editingLecture?.section === selectedSection &&
                selectedSection &&
                selectedLecture && <EditLecture />}
        </div>
    );
}
