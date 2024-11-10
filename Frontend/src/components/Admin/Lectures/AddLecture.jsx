import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
  Input,
} from "@/components/ui/index.js";

const AddLecture = () => {
  const [newLecture, setNewLecture] = useState({
    subject: "",
    startTime: 0,
    endTime: 0,
    day: "",
  });

  const handleAddLecture = () => {};

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
              setNewLecture({ ...newLecture, subject: e.target.value })
            }
          />
        </div>
        <div>
          <label
            htmlFor="startTime"
            className="block text-sm font-medium text-gray-700"
          >
            Start Time
          </label>
          <Input
            id="startTime"
            type="number"
            value={newLecture.startTime}
            onChange={(e) =>
              setNewLecture({
                ...newLecture,
                startTime: parseInt(e.target.value, 10),
              })
            }
          />
        </div>
        <div>
          <label
            htmlFor="endTime"
            className="block text-sm font-medium text-gray-700"
          >
            End Time
          </label>
          <Input
            id="endTime"
            type="number"
            value={newLecture.endTime}
            onChange={(e) =>
              setNewLecture({
                ...newLecture,
                endTime: parseInt(e.target.value, 10),
              })
            }
          />
        </div>
        <div>
          <label
            htmlFor="day"
            className="block text-sm font-medium text-gray-700"
          >
            Day
          </label>
          <Input
            id="day"
            type="text"
            value={newLecture.day}
            onChange={(e) =>
              setNewLecture({
                ...newLecture,
                day: e.target.value,
              })
            }
          />
        </div>
        <Button onClick={handleAddLecture} className="w-full">
          Add Lecture
        </Button>
      </CardContent>
    </Card>
  );
};

export default AddLecture;
