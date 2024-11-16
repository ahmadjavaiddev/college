import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Plus } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Dialog,
    DialogContent,
    DialogTitle,
    Button,
    ScrollArea,
} from "@/components/ui/index.js";
import AddLecture from "@/components/Admin/Lectures/AddLecture";
import useLectureStore from "@/app/useLectureStore";
import DragLectureCard from "./DragLectureCard";

const LecturesCard = () => {
    const {
        loading,
        lectures,
        sections,
        selectedSection,
        reorderLectures,
        newArrangment,
        updateLectures,
        showChangesButton,
    } = useLectureStore();
    const [showAddLectureForm, setShowAddLectureForm] = useState(false);
    const [AddLectureDay, setAddLectureDay] = useState("");
    let lecturesToDsiplay = newArrangment.length > 0 ? newArrangment : lectures;

    useEffect(() => {
        if (newArrangment.length > 0) {
            useLectureStore.setState({ showChangesButton: true });
        }
    }, [newArrangment]);

    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;
        const sourceDay = source.droppableId.split("-")[1].trim();
        const destinationDay = destination.droppableId.split("-")[1].trim();

        // Only allow dragging within the same day
        if (sourceDay !== destinationDay) return;
        reorderLectures(source, destination, sourceDay);
    };

    const handleRestore = () => {
        useLectureStore.setState({
            newArrangment: [],
            showChangesButton: false,
        });
    };

    const handleSectionsLectureUpdate = () => {
        const day = newArrangment[0]?.day?.toLowerCase();
        const lectureToUpdate = newArrangment.filter(
            (item) => item.day.toLowerCase() === day
        );
        updateLectures(lectureToUpdate);
    };

    return (
        <Card className="w-1/3 m-4 overflow-hidden">
            <CardHeader className="flex flex-row justify-between items-center">
                <CardTitle>
                    Lectures -{" "}
                    {
                        sections?.find((item) => item._id === selectedSection)
                            ?.name
                    }
                </CardTitle>

                <div className="flex flex-row gap-3 items-center">
                    {showChangesButton && (
                        <>
                            <Button
                                size="sm"
                                className="w-full"
                                onClick={handleSectionsLectureUpdate}
                            >
                                Save Changes
                            </Button>
                            <Button
                                size="sm"
                                variant="outline"
                                className="w-full"
                                onClick={handleRestore}
                            >
                                Restore
                            </Button>
                        </>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="w-full h-[100vh] pb-28">
                    {loading.lectures ? (
                        <div className="flex justify-center items-center h-full">
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <DragDropContext onDragEnd={handleDragEnd}>
                            {[
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                            ].map((day) => (
                                <Droppable key={day} droppableId={`day-${day}`}>
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="mb-4"
                                        >
                                            <h3 className="font-semibold mb-2">
                                                {day}
                                            </h3>
                                            {lecturesToDsiplay
                                                ?.filter(
                                                    (lecture) =>
                                                        lecture.day.toLowerCase() ===
                                                        day.toLowerCase()
                                                )
                                                ?.map((lecture, index) => (
                                                    <DragLectureCard
                                                        key={lecture._id}
                                                        lecture={lecture}
                                                        index={index}
                                                        provided={provided}
                                                    />
                                                ))}
                                            {provided.placeholder}
                                            <Button
                                                variant="ghost"
                                                className="w-full border-2 border-dashed"
                                                onClick={() => {
                                                    setShowAddLectureForm(true);
                                                    setAddLectureDay(day);
                                                }}
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Lecture
                                            </Button>
                                        </div>
                                    )}
                                </Droppable>
                            ))}
                        </DragDropContext>
                    )}
                </ScrollArea>
            </CardContent>
            <Dialog
                open={showAddLectureForm}
                onOpenChange={setShowAddLectureForm}
            >
                <DialogContent className="p-0">
                    <DialogTitle className="hidden"></DialogTitle>
                    <AddLecture
                        AddLectureDay={AddLectureDay}
                        setShowAddLectureForm={setShowAddLectureForm}
                    />
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default LecturesCard;
