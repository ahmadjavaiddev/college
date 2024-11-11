import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PlusCircle, Trash2 } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
    Button,
    ScrollArea,
} from "@/components/ui/index.js";
import AddLecture from "@/components/Admin/Lectures/AddLecture";
import useLectureStore from "@/app/useLectureStore";
import { useEffect } from "react";

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
                    {showChangesButton ? (
                        <>
                            <Button
                                size="sm"
                                className="w-full"
                                onClick={handleSectionsLectureUpdate}
                            >
                                Submit Changes
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
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <PlusCircle className="w-5 h-5 cursor-pointer text-blue-500" />
                            </DialogTrigger>
                            <DialogContent className="p-0">
                                <DialogTitle className="hidden"></DialogTitle>
                                <AddLecture />
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="w-full h-[calc(100vh/1)] overflow-auto">
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
                                                                } w-full flex justify-between items-center px-3 py-1 mr-3 rounded-md border border-input bg-background shadow-sm`}
                                                                onClick={() =>
                                                                    handleLectureClick(
                                                                        lecture
                                                                    )
                                                                }
                                                            >
                                                                <span>
                                                                    {
                                                                        lecture.subject
                                                                    }
                                                                </span>
                                                                <span>
                                                                    {`${lecture.startTime} - ${lecture.endTime}`}
                                                                    <Button
                                                                        variant="outline"
                                                                        size="sm"
                                                                        className="px-2 py-0 ml-2"
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
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </DragDropContext>
                </ScrollArea>
            </CardContent>
        </Card>
    );
};

export default LecturesCard;
