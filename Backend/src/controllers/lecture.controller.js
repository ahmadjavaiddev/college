import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { Section } from "../models/section.model.js";
import { parseTime } from "../utils/index.js";
import mongoose from "mongoose";

const addLecture = asyncHandler(async (req, res) => {
    const { teacher, section, subject, day, time } = req.body;

    const existingLecture = await Lecture.findOne({
        teacher,
        section,
        day,
        time,
    });
    if (existingLecture) {
        throw new ApiError(
            409,
            "Lecture with teacher, section, day and time already exists"
        );
    }

    const lecture = await Lecture.create({
        teacher,
        section,
        subject,
        day,
        time,
    });
    await User.findByIdAndUpdate(teacher, {
        $push: { lectures: lecture._id },
    });

    const sectionToUpdate = await Section.findById(section);

    sectionToUpdate.lectures.map((item) => {
        if (item.day === day) {
            // Sort subjects by start time
            item.subjects.sort((a, b) => {
                const timeA = parseTime(a.time).start;
                const timeB = parseTime(b.time).start;
                return timeA - timeB; // Sorting in ascending order
            });

            // Now, update the subject with the new lecture time
            item.subjects.push({
                subject: lecture.subject,
                time: lecture.time,
            });

            // Re-sort after adding the new subject
            item.subjects.sort((a, b) => {
                const timeA = parseTime(a.time).start;
                const timeB = parseTime(b.time).start;
                return timeA - timeB;
            });
        }
    });

    await sectionToUpdate.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { lecture: lecture },
                "Lecture added successfully!"
            )
        );
});

const getSectionLectures = asyncHandler(async (req, res) => {
    const { sectionId } = req.params;

    const lectures = await Section.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(sectionId),
            },
        },
        {
            $project: {
                lectures: 1,
            },
        },
    ]);

    // console.log("lectures ::", lectures[0]);

    if (!lectures) {
        throw new ApiError(
            409,
            "Lecture with teacher, section, day and time already exists"
        );
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { lectures: lectures[0] },
                "Lectures added successfully!"
            )
        );
});

const updateLecture = asyncHandler(async (req, res) => {
    const lectureId = req.params.lectureId;
    if (!lectureId) {
        throw new ApiError(401, "Lecture not found!");
    }

    const { name, code, branch } = req.body;

    const lecture = await Lecture.findByIdAndUpdate(
        lectureId,
        {
            $set: {
                name: name,
                code: code,
                branch: branch,
            },
        },
        {
            new: true,
        }
    );

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { lecture: lecture },
                "Lecture Updated SuccessFully!"
            )
        );
});

export { addLecture, getSectionLectures, updateLecture };
