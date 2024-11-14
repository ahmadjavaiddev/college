import { create } from "zustand";
import {
    getSectionDetails,
    getSectionStudents,
    getSectionLectures,
} from "../api";

const useSectionStore = create((set) => ({
    // State
    sectionDetails: null,
    students: [],
    lectures: [],
    loading: {
        section: true,
        students: true,
        lectures: true,
    },

    // Actions
    fetchSectionData: async (sectionId) => {
        try {
            set({ loading: { section: true, students: true, lectures: true } });

            const [sectionResponse, studentsResponse, lecturesResponse] =
                await Promise.all([
                    getSectionDetails(sectionId),
                    getSectionStudents(sectionId),
                    getSectionLectures(sectionId),
                ]);
            console.log("sectionResponse ::", sectionResponse);
            console.log("studentsResponse ::", studentsResponse);
            console.log(
                "lecturesResponse ::",
                lecturesResponse.data.data.lectures
            );
            // const modifiedDetails = {
            //     ...sectionResponse,
            //     attendanceDetails: studentsResponse.attendanceDetails,
            // };

            set({
                sectionDetails: sectionResponse,
                students: studentsResponse.students,
                lectures: lecturesResponse.data.data.lectures,
                loading: { section: false, students: false, lectures: false },
            });
        } catch (error) {
            console.error("Error fetching section data:", error);
            set({
                loading: { section: false, students: false, lectures: false },
            });
        }
    },

    searchStudents: (query, searchBy, studentsList) => {
        if (!query || !searchBy || !studentsList?.length) return [];

        const normalizedQuery = query.toLowerCase().trim();

        return studentsList.filter((student) => {
            const fieldValue = student[searchBy]?.toLowerCase() || "";
            return fieldValue.includes(normalizedQuery);
        });
    },

    filterByStatus: (status, studentsList) => {
        return studentsList.filter(
            (student) => student.status.toUpperCase() === status.toUpperCase()
        );
    },
}));

export default useSectionStore;
