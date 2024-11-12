import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { Section } from "../models/section.model.js";
import mongoose from "mongoose";

const addLecture = asyncHandler(async (req, res) => {
    const { teacher, subject, day } = req.body;
    const sectionId = req.params.sectionId;

    // const existingLecture = await Lecture.findOne({
    //     teacher,
    //     section,
    //     day,
    //     startTime, endTime,
    // });
    // if (existingLecture) {
    //     throw new ApiError(
    //         409,
    //         "Lecture with teacher, section, day and startTime, endTime already exists"
    //     );
    // }

    const lastLecture = await Lecture.findOne({ day: "Monday" }).sort({
        order: -1,
    });

    const lecture = await Lecture.create({
        teacher,
        section: sectionId,
        subject,
        day,
        startTime: "asd",
        endTime: "asd",
        order: lastLecture ? lastLecture.order + 1 : 1,
    });
    await User.findByIdAndUpdate(teacher, {
        $push: { lectures: lecture._id },
    });

    await Section.findByIdAndUpdate(sectionId, {
        $push: { lectures: lecture._id },
    });

    const response = await Lecture.aggregate([
        {
            $match: {
                _id: lecture._id,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "teacher",
                foreignField: "_id",
                as: "teacher",
            },
        },
        {
            $unwind: "$teacher",
        },
        {
            $project: {
                section: 1,
                subject: 1,
                day: 1,
                startTime: 1,
                endTime: 1,
                order: 1,
                teacher: {
                    firstName: 1,
                    lastName: 1,
                },
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { lecture: response[0], success: true },
                "Lecture added successfully!"
            )
        );
});

const getSectionLectures = asyncHandler(async (req, res) => {
    const { sectionId } = req.params;

    const lectures = await Lecture.aggregate([
        {
            $match: {
                section: new mongoose.Types.ObjectId(sectionId),
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "teacher",
                foreignField: "_id",
                as: "teacher",
            },
        },
        {
            $unwind: "$teacher",
        },
        {
            $sort: { order: 1 },
        },
        {
            $project: {
                section: 1,
                subject: 1,
                day: 1,
                startTime: 1,
                endTime: 1,
                order: 1,
                teacher: {
                    firstName: 1,
                    lastName: 1,
                },
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { lectures: lectures.length > 0 ? lectures : [] },
                "Lectures fetched successfully!"
            )
        );
});

const updateLecture = asyncHandler(async (req, res) => {
    const lectureId = req.params.lectureId;
    if (!lectureId) {
        throw new ApiError(401, "Lecture not found!");
    }

    const { subject } = req.body;

    const lecture = await Lecture.findByIdAndUpdate(
        lectureId,
        {
            $set: {
                subject: subject,
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
                { lecture: lecture, success: true },
                "Lecture Updated SuccessFully!"
            )
        );
});

const updateSectionLectures = asyncHandler(async (req, res) => {
    const sectionId = req.params.sectionId;
    if (!sectionId) {
        throw new ApiError(401, "sectionId not found!");
    }

    const lectures = req.body;
    const bulkOps = lectures.map((lecture) => ({
        updateOne: {
            filter: { _id: lecture._id },
            update: {
                $set: {
                    subject: lecture.subject || "$$ROOT.subject",
                    order: lecture.order || "$$ROOT.order",
                },
            },
        },
    }));

    const updatedLectures = await Lecture.bulkWrite(bulkOps);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { lectures: updatedLectures },
                "Lectures Updated Successfully!"
            )
        );
});

const deleteLecture = asyncHandler(async (req, res) => {
    const lectureId = req.params.lectureId;
    if (!lectureId) {
        throw new ApiError(401, "lectureId not found!");
    }

    const lecture = await Lecture.findByIdAndDelete(lectureId);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { lectureId: lecture._id, success: true },
                "Lectures Updated Successfully!"
            )
        );
});

export {
    addLecture,
    getSectionLectures,
    updateLecture,
    updateSectionLectures,
    deleteLecture,
};
