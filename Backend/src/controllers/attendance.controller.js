import { Attendance } from "../models/attendance.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isDateSame } from "../utils/index.js";

// Update attendance in bulk for a given lecture
const markAttendance = asyncHandler(async (req, res) => {
    const { sectionId, lectureId, attendanceRecords } = req.body;

    const studentIds = attendanceRecords.map((record) => record.studentId);
    const existingRecords = await Attendance.find({
        sectionId,
        studentId: { $in: studentIds },
    });

    const existingRecordsMap = new Map(
        existingRecords.map((record) => [String(record.studentId), record])
    );

    const newRecords = [];
    const bulkOps = [];

    for (const record of attendanceRecords) {
        const recordIsAvailable = existingRecordsMap.get(record.studentId);

        if (!recordIsAvailable) {
            newRecords.push({
                sectionId,
                studentId: record.studentId,
                date: new Date(),
                records: [
                    {
                        lectureId,
                        status: record.status?.toUpperCase(),
                    },
                ],
            });
        } else if (isDateSame(recordIsAvailable.date)) {
            const idsOfLectures = recordIsAvailable.records.map((item) =>
                String(item.lectureId)
            );

            if (!idsOfLectures.includes(String(lectureId))) {
                recordIsAvailable.records.push({
                    lectureId,
                    status: record.status?.toUpperCase(),
                });
                bulkOps.push({
                    updateOne: {
                        filter: { _id: recordIsAvailable._id },
                        update: { records: recordIsAvailable.records },
                        validateBeforeSave: false,
                    },
                });
            }
        }
    }

    // Bulk insert new records
    if (newRecords.length > 0) {
        await Attendance.insertMany(newRecords);
    }

    // Bulk update existing records
    if (bulkOps.length > 0) {
        await Attendance.bulkWrite(bulkOps);
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { message: "Attendance updated successfully" },
                "Attendance updated successfully"
            )
        );
});

export { markAttendance };
