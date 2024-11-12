import { create } from "zustand";
import {
    getSectionLectures,
    getSections,
    updateSectionLectures,
    deleteLecture as deleteLectureApi,
    getTeachersFormData,
    addNewLecture as addNewLectureApi,
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
            set((state) => ({ loading: { ...state.loading, lectures: true } }));

            const sectionLecturesInState = get()?.lectures?.filter(
                (lecture) => lecture.section === sectionId
            );
            if (
                sectionLecturesInState.length > 0 &&
                get().newArrangment.length === 0
            ) {
                console.log("Lectures already cached!");
                return;
            }

            requestHandler(
                async () => await getSectionLectures(sectionId),
                (res) => {
                    const response = res.lectures;
                    set({
                        lectures: [...response],
                        error: null,
                        newArrangment: [],
                        showChangesButton: false,
                    });
                }
            );
        } catch (error) {
            console.log("Error :: fetchLectures ::", error.message);
        }
    },

    // Fetch sections with lectures
    fetchSections: async () => {
        set({ loading: { ...get().loading, sections: true } });
        requestHandler(
            async () => await getSections(),
            (res) => {
                set({ sections: res.sections, error: null });
            }
        );
    },

    updateLectures: async (lectures) => {
        const state = get();
        set({ loading: { ...state.loading, lectures: true } });
        requestHandler(
            async () =>
                await updateSectionLectures(state.selectedSection, lectures)
        );
        await state.fetchLectures(state.selectedSection);
    },

    deleteLecture: async (lectureId) => {
        const state = get();
        requestHandler(
            async () => await deleteLectureApi(lectureId),
            (response) => {
                if (response.success && response.lectureId) {
                    const updatedLectures = state.lectures.filter(
                        (lecture) => lecture._id !== response.lectureId
                    );
                    set({ lectures: updatedLectures });
                }
            }
        );
    },

    fetchTeacherFormData: async () => {
        requestHandler(
            async () => await getTeachersFormData(),
            (res) => {
                set({ teachersFormData: res.teachers });
            }
        );
    },

    addNewLecture: async (data) => {
        requestHandler(
            async () => await addNewLectureApi(get().selectedSection, data),
            (response) => {
                if (response.success) {
                    set({
                        lectures: [...get().lectures, response.lecture],
                        error: null,
                    });
                    return true;
                }
            }
        );
    },

    reorderLectures: (source, destination, sourceDay) => {
        const state = get();

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
