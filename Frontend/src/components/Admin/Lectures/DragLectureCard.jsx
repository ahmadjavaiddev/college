import { Draggable } from "react-beautiful-dnd";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/index.js";
import useLectureStore from "@/app/useLectureStore";

const DragLectureCard = ({ lecture, index }) => {
    const {
        setSelectedLecture,
        editingLecture,
        setEditingLecture,
        deleteLecture,
    } = useLectureStore();

    const handleLectureClick = (lecture) => {
        setSelectedLecture(lecture._id);
        setEditingLecture(lecture);
    };

    const handleDeleteLecture = (lectureId) => {
        deleteLecture(lectureId);
    };

    return (
        <Draggable draggableId={lecture._id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`mb-2`}
                >
                    <div
                        // className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center justify-between group hover:shadow-md transition-shadow"
                        className={`${
                            lecture._id === editingLecture?._id
                                ? "bg-black text-white"
                                : " hover:bg-accent hover:text-accent-foreground"
                        } w-full flex justify-between items-center px-2 py-1 mr-3 rounded-md border border-input bg-background shadow-sm`}
                    >
                        <span className="flex items-center">
                            <Button
                                variant="outline"
                                className="h-8 rounded-md text-xs px-2 mr-2 -ml-1"
                                onClick={() => handleLectureClick(lecture)}
                            >
                                <Pencil className="w-4 h-4 text-blue-500" />
                            </Button>
                            {lecture.subject}
                        </span>

                        <span>
                            {`${lecture.startTime} - ${lecture.endTime}`}
                            <Button
                                variant="outline"
                                className="h-8 rounded-md text-xs px-2 ml-2"
                                onClick={() => handleDeleteLecture(lecture._id)}
                            >
                                <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                        </span>
                    </div>
                </div>
            )}
        </Draggable>
    );
};

export default DragLectureCard;
