// import { Attendance } from "../models/attendance.model.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { isDateSame } from "../utils/index.js";

// // Update attendance in bulk for a given lecture
// const markAttendance = asyncHandler(async (req, res) => {
//     const { sectionId, lectureId, attendanceRecords } = req.body;

//     const bulkOps = attendanceRecords.map(record => ({
//         updateOne: {
//             filter: {
//                 sectionId: sectionId,
//                 studentId: record.studentId,
//                 date: { $gte: new Date().setHours(0, 0, 0, 0) }
//             },
//             update: {
//                 $setOnInsert: {
//                     sectionId: sectionId,
//                     studentId: record.studentId,
//                     date: new Date()
//                 },
//                 $addToSet: {
//                     records: {
//                         lectureId: lectureId,
//                         status: record.status
//                     }
//                 }
//             },
//             upsert: true
//         }
//     }));

//     await Attendance.bulkWrite(bulkOps);

//     return res
//         .status(200)
//         .json(
//             new ApiResponse(
//                 200,
//                 { message: "Attendance updated successfully" },
//                 "Attendance updated successfully"
//             )
//         );
// });

// export { markAttendance };
import { Attendance } from "../models/attendance.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isDateSame } from "../utils/index.js";

// Update attendance in bulk for a given lecture
const markAttendance = asyncHandler(async (req, res) => {
    const { sectionId, lectureId, attendanceRecords } = req.body;
    console.log("attendanceRecords ::", attendanceRecords);

    for (const record of attendanceRecords) {
        const recordIsAvailable = await Attendance.findOne({
            sectionId: sectionId,
            studentId: record.studentId,
        });

        if (!recordIsAvailable) {
            await Attendance.create({
                sectionId: sectionId,
                studentId: record.studentId,
                date: new Date(),
                records: [
                    {
                        lectureId: lectureId,
                        status: record.status,
                    },
                ],
            });
        }

        if (isDateSame(recordIsAvailable?.date)) {
            const idsOfLectures = [];
            recordIsAvailable?.records?.map((item) => {
                idsOfLectures.push(String(item.lectureId));
            });

            if (!idsOfLectures.includes(String(lectureId))) {
                recordIsAvailable?.records?.push({
                    lectureId: lectureId,
                    status: record?.status,
                });
                await recordIsAvailable?.save({ validateBeforeSave: false });
            }
        }
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
