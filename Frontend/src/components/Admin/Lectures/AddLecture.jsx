import { useState } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Input,
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/index.js";
import { useEffect } from "react";
import useLectureStore from "../../../app/useLectureStore";

const AddLecture = ({ AddLectureDay, setShowAddLectureForm }) => {
    const [newLecture, setNewLecture] = useState({
        subject: "",
        day: AddLectureDay?.toLowerCase() || "",
        teacher: "",
    });
    const { fetchTeacherFormData, teachersFormData, addNewLecture } =
        useLectureStore();

    useEffect(() => {
        fetchTeacherFormData();
    }, []);

    const handleAddLecture = async () => {
        const response = await addNewLecture(newLecture);
        if (response) {
            console.log("response in handleAddLecture ::", response);
            setShowAddLectureForm(false);
        }
    };

    const handleDayChange = (value) => {
        setNewLecture({
            ...newLecture,
            day: value,
        });
    };

    const handleTeacherChange = (value) => {
        setNewLecture({
            ...newLecture,
            teacher: value,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Add New Lecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Title
                    </label>
                    <Input
                        id="title"
                        value={newLecture.subject}
                        onChange={(e) =>
                            setNewLecture({
                                ...newLecture,
                                subject: e.target.value,
                            })
                        }
                    />
                </div>
                <div>
                    <label
                        htmlFor="teacher"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Teacher
                    </label>
                    <Select onValueChange={handleTeacherChange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Teacher" />
                        </SelectTrigger>
                        <SelectContent>
                            {teachersFormData?.map((item) => (
                                <SelectItem value={item?._id} key={item?._id}>
                                    {item?.firstName} {item?.lastName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label
                        htmlFor="day"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Day
                    </label>
                    <Select
                        defaultValue={newLecture.day || ""}
                        onValueChange={handleDayChange}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select Day" />
                        </SelectTrigger>
                        <SelectContent>
                            {[
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                            ].map((item) => (
                                <SelectItem
                                    value={item?.toLowerCase()}
                                    key={item}
                                >
                                    {item}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <Button onClick={handleAddLecture} className="w-full">
                    Add Lecture
                </Button>
            </CardContent>
        </Card>
    );
};

export default AddLecture;
