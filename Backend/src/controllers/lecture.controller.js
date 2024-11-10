import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import { Section } from "../models/section.model.js";
import mongoose from "mongoose";

const addLecture = asyncHandler(async (req, res) => {
    const { teacher, section, subject, day, startTime, endTime, order } =
        req.body;

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

    const lecture = await Lecture.create({
        teacher,
        section,
        subject,
        day,
        startTime,
        endTime,
        order,
    });
    await User.findByIdAndUpdate(teacher, {
        $push: { lectures: lecture._id },
    });

    await Section.findByIdAndUpdate(section, {
        $push: { lectures: lecture._id },
    });

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

    const lectures = await Lecture.find({
        section: new mongoose.Types.ObjectId(sectionId),
    }).sort({ order: 1 });

    if (!lectures || lectures.length === 0) {
        throw new ApiError(404, "No lectures found for the given section");
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                { lectures: lectures },
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
    // console.log("lectures ::", lectures);
    const updatedLectures = await Promise.all(
        lectures.map(async (item) => {
            return await Lecture.findByIdAndUpdate(
                item._id,
                {
                    $set: {
                        subject: item?.subject,
                        order: item?.order,
                    },
                },
                {
                    new: true,
                }
            );
        })
    );

    console.log("updatedLectures ::", updatedLectures);

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

export { addLecture, getSectionLectures, updateLecture, updateSectionLectures };
