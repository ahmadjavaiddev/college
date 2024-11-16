import { create } from "zustand";
import {
    getSectionLectures,
    updateSectionLectures,
    deleteLecture as deleteLectureApi,
    getTeachersFormData,
    addNewLecture as addNewLectureApi,
    updateLecture,
    getSectionsWithDetails,
} from "../api";
import { requestHandler } from "../utils";

const useLectureStore = create((set, get) => ({
    lectures: [],
    sections: [],
    loading: {
        lectures: false,
        sections: false,
    },
    error: null,
    selectedSection: "",
    selectedLecture: "",
    editingLecture: {},
    newArrangment: [],
    showChangesButton: false,
    teachersFormData: [],

    fetchLectures: async (sectionId) => {
        try {
            set((state) => ({
                loading: { ...state.loading, lectures: true },
                selectedLecture: "",
                editingLecture: {},
            }));

            const sectionLecturesInState = get()?.lectures?.filter(
                (lecture) => lecture.section === sectionId
            );
            if (
                sectionLecturesInState.length > 0 &&
                get().newArrangment.length === 0
            ) {
                set({ loading: { lectures: false } });
                console.log("Lectures already cached!");
                return;
            }

            await requestHandler(
                async () => await getSectionLectures(sectionId),
                (res) => {
                    const response = res.lectures;
                    set({
                        lectures: [...response],
                        error: null,
                        newArrangment: [],
                        showChangesButton: false,
                        loading: { lectures: false },
                    });
                },
                () => {
                    set({
                        lectures: null,
                        loading: { lectures: false },
                    });
                },
                null,
                "Error while fetching lectures"
            );
        } catch (error) {
            console.log("Error :: fetchLectures ::", error.message);
        }
    },

    // Fetch sections with lectures
    fetchSections: async () => {
        set({ loading: { ...get().loading, sections: true } });

        const state = get();
        if (state.sections.length > 0) {
            set({ loading: { sections: false } });
            return;
        }

        await requestHandler(
            async () => await getSectionsWithDetails(),
            (res) => {
                set({
                    sections: res.sections,
                    error: null,
                    loading: { sections: false },
                });
            },
            () => {
                set({
                    sections: null,
                    loading: { sections: false },
                });
            },
            null,
            "Error while fetching sections"
        );
    },

    updateLectures: async (lectures) => {
        const state = get();
        set({ loading: { lectures: true } });

        await requestHandler(
            async () =>
                await updateSectionLectures(state.selectedSection, lectures),
            (res) => {
                if (res.success) {
                    const filteredValues = [...lectures];
                    state.lectures.forEach((item) => {
                        const found = lectures.find(
                            (value) => value._id === item._id
                        );
                        if (!found) {
                            filteredValues.push(item);
                        }
                    });

                    set({
                        lectures: filteredValues,
                        loading: { lectures: false },
                        newArrangment: [],
                        showChangesButton: false,
                    });
                }
            },
            () => {
                set({
                    loading: { sections: false },
                });
            },
            "Lectures Updated Successfully!",
            "Error while updating lectures"
        );
    },

    updateOneLecture: async () => {
        const state = get();
        set({ loading: { lectures: true } });
        await requestHandler(
            async () =>
                await updateLecture(
                    state.editingLecture._id,
                    state.editingLecture
                ),
            (res) => {
                if (res.success) {
                    const updateLectrueRemoved = state.lectures.filter(
                        (item) => item._id !== state.editingLecture._id
                    );
                    const updatedLectures = [
                        ...updateLectrueRemoved,
                        res.lecture,
                    ].sort((a, b) => a.order - b.order);
                    set({
                        lectures: updatedLectures,
                        loading: { lectures: false },
                        editingLecture: {},
                        selectedLecture: "",
                    });
                }
            },
            () => {
                set({
                    loading: { lectures: false },
                });
            },
            "Lecture Updated Successfully!",
            "Error while updating lecture"
        );
    },

    deleteLecture: async (lectureId) => {
        const state = get();
        await requestHandler(
            async () => await deleteLectureApi(lectureId),
            (response) => {
                if (response.success && response.lectureId) {
                    const updatedLectures = state.lectures.filter(
                        (lecture) => lecture._id !== response.lectureId
                    );
                    set({ lectures: updatedLectures });
                }
            },
            null,
            "Lecture Deleted Successfully!",
            "Error while deleting lecture"
        );
    },

    fetchTeacherFormData: async () => {
        await requestHandler(
            async () => await getTeachersFormData(),
            (res) => {
                set({ teachersFormData: res.teachers });
            }
        );
    },

    addNewLecture: async (data) => {
        await requestHandler(
            async () => await addNewLectureApi(get().selectedSection, data),
            (response) => {
                if (response.success) {
                    set({
                        lectures: [...get().lectures, response.lecture],
                        error: null,
                    });
                    return true;
                }
            },
            "Lecture Added Successfully!",
            "Error while adding lecture"
        );
    },

    reorderLectures: (source, destination, sourceDay) => {
        const state = get();
        set({ editingLecture: {}, selectedLecture: "" });

        const valueToUse =
            state.newArrangment.length > 0
                ? state.newArrangment
                : state.lectures;

        const updatedLectures = Array.from(valueToUse);
        // Filter lectures for the selected section and day
        const dayLectures = updatedLectures.filter(
            (lecture) =>
                lecture.day.toLowerCase() === sourceDay.toLowerCase() &&
                lecture.section === state.selectedSection
        );

        // Reorder dayLectures based on drag result
        const [movedLecture] = dayLectures.splice(source.index, 1);
        dayLectures.splice(destination.index, 0, movedLecture);

        // Update `order` based on new indices
        dayLectures.forEach((lecture, index) => {
            lecture.order = index + 1;
        });

        const values = valueToUse.filter(
            (item) =>
                item.day.toLowerCase() !== sourceDay.toLowerCase() &&
                item.section == state.selectedSection
        );

        // Update the store state
        set({ newArrangment: [...dayLectures, ...values] });
    },

    // ...other functions remain the same
    setSelectedSection: (sectionId) => set({ selectedSection: sectionId }),
    setSelectedLecture: (lectureId) => set({ selectedLecture: lectureId }),

    setEditingLecture: (value) => set({ editingLecture: value }),
}));

export default useLectureStore;
