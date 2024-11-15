import { create } from "zustand";
import {
    getSectionDetails,
    getSectionStudents,
    getSectionLectures,
} from "../api";
import { requestHandler } from "../utils";

const useSectionStore = create((set, get) => ({
    allStudents: [],
    allLectures: [],
    allSectionDetails: [],
    sectionDetails: {},
    sectionLectures: [],
    sectionStudents: [],
    sectionId: "",
    loading: {
        section: true,
        students: true,
        lectures: true,
    },
    searchQuery: "",
    searchError: "",
    noResults: false,
    searchedStudents: [],
    studentsStatus: "",
    searchBy: "",

    // Actions
    fetchSectionData: async (sectionId) => {
        try {
            set({
                loading: { section: true, students: true },
                sectionId: sectionId,
            });
            const state = get();

            const sectionInState = state.allSectionDetails.find(
                (section) => section._id === sectionId
            );
            const sectionStudentsInState = state.allStudents.filter(
                (student) => student.section === sectionInState?.name
            );

            // Check if data is already in state
            if (sectionInState && sectionStudentsInState.length) {
                console.log("Section data already in state...");
                set({
                    sectionDetails: sectionInState,
                    sectionStudents: sectionStudentsInState,
                    loading: {
                        section: false,
                        students: false,
                    },
                });
                return;
            }

            console.log("Fetching section data from API...");

            const [sectionResponse, studentsResponse] = await Promise.all([
                getSectionDetails(sectionId),
                getSectionStudents(sectionId),
            ]);

            const modifiedDetails = {
                ...sectionResponse,
                attendanceDetails: studentsResponse.attendanceDetails,
            };

            // Use spread operator directly in set
            set((prev) => ({
                allStudents: [
                    ...prev.allStudents,
                    ...studentsResponse.students,
                ],
                allSectionDetails: [...prev.allSectionDetails, modifiedDetails],
                sectionDetails: modifiedDetails,
                sectionStudents: studentsResponse.students,
                loading: { section: false, students: false },
            }));
        } catch (error) {
            console.error("Error fetching section data:", error);
            set({
                loading: { section: false, students: false },
            });
        }
    },

    fetchSectionLectures: async () => {
        try {
            set({ loading: { lectures: true } });
            const state = get();

            // Combine filtering into a single check
            const sectionLecturesInState = state.allLectures.filter(
                (lecture) => lecture.section === state.sectionId
            );

            // Check if data is already in state
            if (sectionLecturesInState.length > 0) {
                console.log("Section Lectures already in state :)");
                set({
                    sectionLectures: sectionLecturesInState,
                    loading: { lectures: false },
                });
                return;
            }

            console.log("Fetching Section Lectures data from API...");

            requestHandler(
                async () => await getSectionLectures(state.sectionId),
                (res) => {
                    set((prev) => ({
                        allLectures: [...prev.allLectures, ...res.lectures],
                        sectionLectures: res.lectures,
                        loading: { lectures: false },
                    }));
                },
                () => {
                    set({
                        sectionLectures: null,
                        loading: { lectures: false },
                    });
                }
            );
        } catch (error) {
            console.error("Error fetching section lectures:", error);
            set({ loading: { lectures: false } });
        }
    },

    searchStudents: (query, searchBy) => {
        const state = get();
        if (!query || !searchBy || !state.sectionStudents?.length) return [];

        const normalizedQuery = query.toLowerCase().trim();

        const filteredStudents = state.sectionStudents.filter((student) => {
            const fieldValue = student[searchBy]?.toLowerCase() || "";
            return fieldValue.includes(normalizedQuery);
        });

        set({
            searchedStudents: filteredStudents,
            noResults: !filteredStudents.length > 0,
        });
    },

    filterByStatus: (status) => {
        const state = get();
        return state.sectionStudents.filter(
            (student) => student.status.toUpperCase() === status.toUpperCase()
        );
    },
}));

export default useSectionStore;
