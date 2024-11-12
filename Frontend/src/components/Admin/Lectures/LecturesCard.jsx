import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Pencil, Plus, Trash2 } from "lucide-react";
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
import { useEffect } from "react";
import { useState } from "react";

const LecturesCard = () => {
    const {
        lectures,
        sections,
        selectedSection,
        reorderLectures,
        setSelectedLecture,
        editingLecture,
        setEditingLecture,
        newArrangment,
        updateLectures,
        showChangesButton,
        deleteLecture,
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

    const handleLectureClick = (lecture) => {
        setSelectedLecture(lecture._id);
        setEditingLecture(lecture);
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

    const handleDeleteLecture = (lectureId) => {
        deleteLecture(lectureId);
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
                                                <Draggable
                                                    key={lecture._id}
                                                    draggableId={lecture._id}
                                                    index={index}
                                                >
                                                    {(provided) => (
                                                        <div
                                                            ref={
                                                                provided.innerRef
                                                            }
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`mb-2`}
                                                        >
                                                            <div
                                                                className={`${
                                                                    lecture._id ===
                                                                    editingLecture?._id
                                                                        ? "bg-black text-white"
                                                                        : " hover:bg-accent hover:text-accent-foreground"
                                                                } w-full flex justify-between items-center px-2 py-1 mr-3 rounded-md border border-input bg-background shadow-sm`}
                                                            >
                                                                <span>
                                                                    <Button
                                                                        variant="outline"
                                                                        className="h-8 rounded-md text-xs px-2 mr-2 -ml-1"
                                                                        onClick={() =>
                                                                            handleLectureClick(
                                                                                lecture
                                                                            )
                                                                        }
                                                                    >
                                                                        <Pencil className="w-4 h-4 text-blue-500" />
                                                                    </Button>
                                                                    {
                                                                        lecture.subject
                                                                    }
                                                                </span>

                                                                <span>
                                                                    {`${lecture.startTime} - ${lecture.endTime}`}
                                                                    <Button
                                                                        variant="outline"
                                                                        className="h-8 rounded-md text-xs px-2 ml-2"
                                                                        onClick={() =>
                                                                            handleDeleteLecture(
                                                                                lecture._id
                                                                            )
                                                                        }
                                                                    >
                                                                        <Trash2 className="w-4 h-4 text-red-600" />
                                                                    </Button>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                        <Button
                                            variant="outline"
                                            className={`w-full flex justify-center items-center rounded-md border-2 border-dashed border-blue-600 bg-background shadow-sm`}
                                            onClick={() => {
                                                setShowAddLectureForm(true);
                                                setAddLectureDay(day);
                                            }}
                                        >
                                            <Plus className="w-4 h-4 text-blue-600" />
                                        </Button>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
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
