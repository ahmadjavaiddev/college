import { useState, useMemo, useEffect } from "react";
import { CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
} from "@/components/ui";
import { useParams } from "react-router-dom";
import { getLectureData, submitAttendance } from "../../../api";
import Processing from "../../../components/Admin/Processing";

export default function AttendanceMarker() {
  const [attendance, setAttendance] = useState([]);
  const [filter, setFilter] = useState("all");
  const [students, setStudents] = useState([]);
  const { lectureId, sectionId } = useParams();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async () => {
    try {
      setProcessing(true);
      const modifiedData = attendance.map((item) => {
        return {
          studentId: item.studentId,
          status: item.status?.toUpperCase(),
        };
      });
      const response = await submitAttendance(
        sectionId,
        lectureId,
        modifiedData
      );
      if (response.success) {
        setProcessing(false);
      }
    } catch (error) {
      console.log("Error :: handleSubmit ::", error);
      setProcessing(false);
    }
  };

  const handleAttendanceChange = (studentId, status) => {
    const updatedAttendance = attendance.map((item) => {
      if (item.studentId === studentId) {
        return { ...item, status };
      }
      return item;
    });
    setAttendance(updatedAttendance);
  };

  const handleAttendanceClear = () => {
    const clearedAttendance = students.map((student) => ({
      studentId: student._id,
      status: null, // Clear all statuses
    }));
    setAttendance(clearedAttendance);
  };

  const handleLectureData = async () => {
    try {
      const studentsResponse = await getLectureData(sectionId);
      setStudents(studentsResponse);
      const initialAttendance = studentsResponse.map((student) => ({
        studentId: student._id,
        status: null, // Initialize all students with no status
      }));
      setAttendance(initialAttendance);
    } catch (error) {
      console.log("Error :: getLectureData ::", error);
    }
  };

  const filterActiveButton = (studentId, status) => {
    const data = attendance.find((item) => item.studentId === studentId);
    return data?.status?.toLowerCase() === status?.toLowerCase();
  };

  useEffect(() => {
    handleLectureData();
  }, [lectureId, sectionId]);

  const markAllStatus = (status) => {
    const newAttendance = students.map((item) => ({
      studentId: item._id,
      status,
    }));
    setAttendance(newAttendance);
  };

  const attendanceStats = useMemo(() => {
    const stats = { present: 0, absent: 0, late: 0 };
    attendance.forEach((record) => {
      if (record.status) stats[record.status]++;
    });
    return stats;
  }, [attendance]);

  return (
    <Card className="w-[700px] mx-auto p-4 mt-5">
      <h1 className="text-2xl font-bold mb-4">
        Enhanced Student Attendance Marker
      </h1>

      <div className="mb-4 flex space-x-4">
        <Select value={filter} onValueChange={(value) => setFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="present">Present</SelectItem>
            <SelectItem value="absent">Absent</SelectItem>
            <SelectItem value="late">Late</SelectItem>
          </SelectContent>
        </Select>

        <Button
          onClick={() => markAllStatus("present")}
          size="sm"
          className="flex items-center"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark All Present
        </Button>
        <Button
          onClick={() => markAllStatus("absent")}
          size="sm"
          className="flex items-center"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark All Absent
        </Button>
        <Button
          onClick={() => markAllStatus("late")}
          size="sm"
          className="flex items-center"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Mark All Late
        </Button>
        <Button
          onClick={handleAttendanceClear}
          size="sm"
          className="flex items-center"
        >
          <CheckCircle className="mr-2 h-4 w-4" />
          Clear
        </Button>
      </div>

      <div className="mb-4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Attendance Statistics</h2>
        <div className="flex space-x-4">
          <div>Present: {attendanceStats.present}</div>
          <div>Absent: {attendanceStats.absent}</div>
          <div>Late: {attendanceStats.late}</div>
        </div>
      </div>

      <Table>
        {processing && <Processing />}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Roll Number</TableHead>
            <TableHead>Attendance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow
              key={student._id}
              className={
                students.indexOf(student) % 2 === 0 ? "bg-gray-100" : "bg-white"
              }
            >
              <TableCell>
                <div className="flex gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student.image} alt={student.firstName} />
                    <AvatarFallback>{student.firstName}</AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col">
                    <div className="text-base font-semibold">
                      {student.firstName} {student.lastName}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {student.email}
                    </p>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span className="font-semibold">{student._id}</span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {[
                    { text: "Present" },
                    { text: "Absent" },
                    { text: "Late" },
                  ].map((item) => (
                    <Button
                      key={item.text}
                      size="sm"
                      variant={
                        filterActiveButton(student._id, item.text.toLowerCase())
                          ? "default"
                          : "outline"
                      }
                      onClick={() =>
                        handleAttendanceChange(
                          student._id,
                          item.text.toLowerCase()
                        )
                      }
                    >
                      {item.text}
                    </Button>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end">
        <Button
          className="mt-4"
          onClick={handleSubmit}
          disabled={processing ? true : false}
        >
          Submit Attendance
        </Button>
      </div>
    </Card>
  );
}
