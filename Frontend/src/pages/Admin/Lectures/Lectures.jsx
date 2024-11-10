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

export default function Lectures() {
  const {
    fetchLectures,
    fetchSections,
    sections,
    selectedSection,
    selectedLecture,
    setSelectedSection,
    editingLecture,
    showChangesButton,
    newArrangment,
  } = useLectureStore();

  useEffect(() => {
    fetchSections();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Card className="w-1/4 m-4 overflow-hidden">
        <CardHeader>
          <CardTitle>Sections</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {sections.map((section) => (
              <Button
                key={section?._id}
                variant={selectedSection === section?._id ? "default" : "ghost"}
                className="w-full justify-start mb-2"
                disabled={
                  showChangesButton && newArrangment.length > 0 ? true : false
                }
                onClick={() => {
                  setSelectedSection(section?._id);
                  fetchLectures(section?._id);
                }}
              >
                {section?.name}
              </Button>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedSection && <LecturesCard />}

      {editingLecture && selectedSection && selectedLecture && <EditLecture />}
    </div>
  );
}
