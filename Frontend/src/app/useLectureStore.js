import { create } from "zustand";
import { getSectionLectures, getSections, updateSectionLectures } from "../api";

const useLectureStore = create((set, get) => ({
  lectures: [],
  selectedSectionLectures: {},
  sections: [],
  loading: {
    lectures: false,
    sections: false,
  },
  error: null,
  lectureToEdit: {},
  showEditLecture: false,
  selectedSection: "",
  selectedLecture: "",
  editingLecture: {},
  newArrangment: [],
  showChangesButton: false,

  fetchLectures: async (sectionId) => {
    try {
      set((state) => ({ loading: { ...state.loading, lectures: true } }));

      // Fetch new lectures if not cached
      const response = await getSectionLectures(sectionId);
      set({
        lectures: [...response],
        selectedSectionLectures: response,
        error: null,
      });
    } catch (error) {
      set({ error: error.message });
    } finally {
      set((state) => ({ loading: { ...state.loading, lectures: false } }));
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

  reorderLectures: (source, destination, sourceDay) => {
    const state = get();

    const valueToUse =
      state.newArrangment.length > 0 ? state.newArrangment : state.lectures;
    console.log("state.newArrangment ::", state.newArrangment);
    console.log("state.lectures ::", state.lectures);

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
