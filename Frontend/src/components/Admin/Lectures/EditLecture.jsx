import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Input,
} from "@/components/ui/index.js";
import useLectureStore from "../../../app/useLectureStore";

const EditLecture = () => {
    const {
        selectedSection,
        editingLecture,
        setEditingLecture,
        updateOneLecture,
    } = useLectureStore();

    const handleDurationChange = (e) => {
        if (editingLecture && selectedSection) {
            const newDuration = parseInt(e.target.value, 10);
            updateLectureDuration(
                selectedSection,
                editingLecture.id,
                newDuration
            );
            setEditingLecture({ ...editingLecture, duration: newDuration });
        }
    };

    return (
        <Card className="w-1/3 m-4">
            <CardHeader>
                <CardTitle>Edit Lecture</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <label
                            htmlFor="lectureTitle"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <Input
                            id="lectureTitle"
                            value={editingLecture.subject || ""}
                            onChange={(e) =>
                                setEditingLecture({
                                    ...editingLecture,
                                    subject: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lectureDuration"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Duration (minutes)
                        </label>
                        <Input
                            id="lectureDuration"
                            type="number"
                            value={editingLecture.duration || ""}
                            onChange={handleDurationChange}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="lectureDay"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Day
                        </label>
                        <Input
                            id="lectureDay"
                            type="number"
                            min="1"
                            max="6"
                            value={editingLecture.day || ""}
                            readOnly
                        />
                    </div>
                    <Button
                        className="w-full"
                        onClick={() => updateOneLecture()}
                    >
                        Save Changes
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default EditLecture;
