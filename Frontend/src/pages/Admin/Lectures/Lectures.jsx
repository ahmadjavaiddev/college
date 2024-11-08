import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useLectureStore from "../../../app/useLectureStore";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Label,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/index";
import { GripVertical } from "lucide-react";

const transformLectures = (lectures) => {
  const transformed = [];
  const groupedByDay = {};

  lectures.forEach((lecture) => {
    const key = `${lecture.section}-${lecture.day.toLowerCase()}`;
    if (!groupedByDay[key]) {
      groupedByDay[key] = {
        section: lecture.section,
        day: lecture.day.toLowerCase(),
        lectures: [],
      };
    }
    groupedByDay[key].lectures.push({
      _id: lecture._id,
      teacher: lecture.teacher,
      subject: lecture.subject,
      time: lecture.time,
    });
  });

  Object.values(groupedByDay).forEach((group) => {
    transformed.push(group);
  });

  return transformed;
};

export default function Lectures() {
  const {
    lectures,
    sections,
    loading,
    fetchLectures,
    fetchSections,
    updateLecture,
    updateSectionLectures,
    selectedSectionLectures,
  } = useLectureStore();

  const [lectureToEdit, setLectureToEdit] = useState({});
  const [sectionToEdit, setSectionToEdit] = useState({});
  const [showEditLecture, setShowEditLecture] = useState(false);
  const [hasChanges, setHasChanges] = useState({});
  const [originalArrangements, setOriginalArrangements] = useState({});

  useEffect(() => {
    fetchSections();
  }, []);
  useEffect(() => {
    console.log("lectureToEdit ::", lectureToEdit);
  }, [lectureToEdit]);

  const handleSectionEdit = async (section) => {
    try {
      setSectionToEdit(section);
      const response = await fetchLectures(section?._id);
      if (response) {
        const transformedLectures = transformLectures(response);
        useLectureStore.setState({
          selectedSectionLectures: transformedLectures,
        });
        setOriginalArrangements((prev) => ({
          ...prev,
          [section?._id]: transformedLectures,
        }));
      }
    } catch (error) {
      console.error("Failed to update lecture:", error);
    }
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const allLectures = Array.from(selectedSectionLectures ?? []);

    const sourceDay = source.droppableId.split("-")[2];
    const destinationDay = destination.droppableId.split("-")[2];

    const sourceDayGroup = allLectures.find(
      (group) =>
        group.section === sectionToEdit._id &&
        group.day.toLowerCase() === sourceDay.toLowerCase()
    );

    const destinationDayGroup = allLectures.find(
      (group) =>
        group.section === sectionToEdit._id &&
        group.day.toLowerCase() === destinationDay.toLowerCase()
    );

    if (!sourceDayGroup) return;

    const [removedLecture] = sourceDayGroup.lectures.splice(source.index, 1);

    if (sourceDay === destinationDay) {
      sourceDayGroup.lectures.splice(destination.index, 0, removedLecture);
    } else {
      if (!destinationDayGroup) {
        allLectures.push({
          section: sectionToEdit._id,
          day: destinationDay,
          lectures: [removedLecture],
        });
      } else {
        destinationDayGroup.lectures.splice(
          destination.index,
          0,
          removedLecture
        );
      }
    }

    useLectureStore.setState({ selectedSectionLectures: allLectures });
    updateSectionChanges(sectionToEdit._id);
  };

  const updateSectionChanges = (sectionId) => {
    // const section = sections.find((s) => s._id === sectionId);
    const originalArrangement = originalArrangements[sectionId] || [];
    const currentArrangement = selectedSectionLectures;

    const hasChanged = !areArraysEqual(originalArrangement, currentArrangement);
    setHasChanges((prev) => ({
      ...prev,
      [sectionId]: hasChanged,
    }));
  };

  const handleLectureUpdate = async (sectionId, lectureId) => {
    try {
      await updateLecture(sectionId, lectureId, lectureToEdit);
      setShowEditLecture(false);
      setLectureToEdit({});
    } catch (error) {
      console.error("Failed to update lecture:", error);
      // Handle error (show toast notification, etc.)
    }
  };

  const areArraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    return arr1.every((lecture, index) => lecture._id === arr2[index]._id);
  };

  const getLecturesByDay = (lectures, day) => {
    const values = lectures?.find(
      (group) => group.day.toLowerCase() === day.toLowerCase()
    );
    console.log("values ::", values);
    return lectures?.find(
      (group) => group.day.toLowerCase() === day.toLowerCase()
    );
  };

  return (
    <div className="container mx-auto py-6">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          className={`grid gap-6 transition-[grid-template-columns] duration-300 ${
            showEditLecture ? "md:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          <Card className="animate-in fade-in slide-in-from-left duration-500">
            <CardHeader>
              <CardTitle>Sections</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              {sections?.map((section) => (
                <Card
                  key={section?._id}
                  onClick={() => handleSectionEdit(section)}
                  className="animate-in fade-in slide-in-from-left duration-300"
                >
                  <CardHeader>
                    <CardTitle>{section?.name}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </CardContent>
          </Card>

          {sections
            .filter((item) => item?._id === sectionToEdit?._id)
            .map((section) => (
              <Card
                key={section?._id}
                className="animate-in fade-in slide-in-from-bottom duration-500"
              >
                <CardHeader>
                  <CardTitle>{section?.name}</CardTitle>
                </CardHeader>
                {loading.lectures ? (
                  <h3>Loading</h3>
                ) : (
                  <CardContent>
                    <Tabs defaultValue="monday" className="w-full">
                      <TabsList className="grid grid-cols-6 w-full">
                        <TabsTrigger value="monday">Mon</TabsTrigger>
                        <TabsTrigger value="tuesday">Tue</TabsTrigger>
                        <TabsTrigger value="wednesday">Wed</TabsTrigger>
                        <TabsTrigger value="thursday">Thu</TabsTrigger>
                        <TabsTrigger value="friday">Fri</TabsTrigger>
                        <TabsTrigger value="saturday">Sat</TabsTrigger>
                      </TabsList>

                      {[
                        "monday",
                        "tuesday",
                        "wednesday",
                        "thursday",
                        "friday",
                        "saturday",
                      ].map((day) => (
                        <TabsContent key={day} value={day}>
                          <Droppable
                            droppableId={`section-${section?._id}-${day}`}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                className="flex flex-col gap-4"
                              >
                                {getLecturesByDay(
                                  selectedSectionLectures,
                                  day
                                )?.lectures?.map((lecture, index) => (
                                  <Draggable
                                    key={lecture?._id}
                                    draggableId={lecture?._id}
                                    index={index}
                                  >
                                    {(provided) => (
                                      <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="flex items-center gap-2 rounded-lg border p-3 bg-card"
                                        onClick={() => {
                                          setLectureToEdit(lecture);
                                          setShowEditLecture(true);
                                        }}
                                      >
                                        <GripVertical className="h-4 w-4" />
                                        <div>
                                          <div className="font-medium">
                                            {lecture?.subject}
                                          </div>
                                          <div className="text-sm text-muted-foreground">
                                            {lecture?.day} - {lecture?.time}
                                          </div>
                                        </div>
                                      </div>
                                    )}
                                  </Draggable>
                                ))}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                        </TabsContent>
                      ))}
                    </Tabs>

                    {hasChanges[section?._id] && (
                      <div className="mt-4 animate-in animate-out fade-in slide-in-from-bottom duration-500">
                        <Button
                          onClick={() => handleSectionSubmit(section?._id)}
                          className="w-full"
                        >
                          Submit Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                )}
              </Card>
            ))}
          {showEditLecture && lectureToEdit && (
            <Card className="animate-in fade-in slide-in-from-right duration-300">
              <CardHeader>
                <CardTitle>Edit Lecture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <Label>
                    Title
                    <Input
                      value={lectureToEdit.subject}
                      onChange={(e) =>
                        setLectureToEdit((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                    />
                  </Label>
                </div>
                <div className="flex gap-4 mt-4">
                  <Button
                    onClick={() => {
                      handleLectureUpdate(
                        sectionToEdit?._id,
                        lectureToEdit?._id
                      );
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowEditLecture(false);
                      setLectureToEdit({});
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DragDropContext>
    </div>
  );
}
