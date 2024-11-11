import { create } from "zustand";
import {
    getSectionLectures,
    getSections,
    updateSectionLectures,
    deleteLecture as deleteLectureApi,
} from "../api";

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

    fetchLectures: async (sectionId) => {
        try {
            set((state) => ({ loading: { ...state.loading, lectures: true } }));

            // Check if lectures are already cached
            const sectionLecturesInState = get()?.lectures?.filter(
                (lecture) => lecture.section === sectionId
            );
            if (sectionLecturesInState.length > 0) {
                console.log("Lectures already cached!");
                return;
            }

            // Fetch new lectures if not cached
            const response = await getSectionLectures(sectionId);
            set({
                lectures: [...response],
                error: null,
            });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set((state) => ({
                loading: { ...state.loading, lectures: false },
            }));
        }
    },

    // Fetch sections with lectures
    fetchSections: async () => {
        try {
            set({ loading: { ...get().loading, sections: true } });
            const response = await getSections();
            set({ sections: response, error: null });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: { ...get().loading, sections: false } });
        }
    },

    updateLectures: async (lectures) => {
        try {
            const state = get();
            set({ loading: { ...state.loading, lectures: true } });
            await updateSectionLectures(state.selectedSection, lectures);

            await state.fetchLectures(state.selectedSection);
            set({ error: null, newArrangment: [], showChangesButton: false });
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ loading: { ...get().loading, sections: false } });
        }
    },

    deleteLecture: async (lectureId) => {
        const state = get();
        const response = await deleteLectureApi(lectureId);
        if (response.success && response.lectureId) {
            const updatedLectures = state.lectures.filter(
                (lecture) => lecture._id !== response.lectureId
            );
            set({ lectures: updatedLectures });
        }
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
