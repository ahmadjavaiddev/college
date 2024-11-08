import { create } from "zustand";
import {
  getSectionLectures,
  getSections,
  updateLecture as updateLectureApi,
  updateSectionLectures,
} from "../api";
import { transformLecturesData } from "../utils";

const useLectureStore = create((set, get) => ({
  lectures: [],
  selectedSectionLectures: {},
  sections: [],
  loading: {
    lectures: false,
    sections: false,
  },
  error: null,

  // Fetch lectures
  fetchLectures: async (sectionId) => {
    try {
      set((state) => ({ loading: { ...state.loading, lectures: true } }));

      // Check if lectures for this section are already cached
      const currentLectures = get().lectures.filter(
        (item) => item.section === sectionId
      );

      if (currentLectures.length > 0) {
        set({
          selectedSectionLectures: currentLectures,
          error: null,
        });
        return;
      }

      // Fetch new lectures if not cached
      const response = await getSectionLectures(sectionId);
      const modifiedLectures = transformLecturesData(response);

      set((state) => ({
        lectures: [...state.lectures, ...modifiedLectures],
        selectedSectionLectures: modifiedLectures,
        error: null,
      }));
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

  // Update lecture
  updateLecture: async (sectionId, lectureId, lecture) => {
    try {
      set({ loading: { ...get().loading, lectures: true } });
      const response = await updateLectureApi(lectureId, lecture);

      if (response) {
        set((state) => {
          // Update the selectedSectionLectures array
          const updatedSelectedLectures = state.lectures.map((dayGroup) => {
            if (dayGroup.section === sectionId) {
              return {
                ...dayGroup,
                lectures: dayGroup.lectures.map((existingLecture) =>
                  existingLecture._id === lectureId
                    ? (existingLecture = {
                        ...existingLecture,
                        subject: lecture.subject,
                      })
                    : existingLecture
                ),
              };
            }
            return dayGroup;
          });

          return {
            selectedSectionLectures: updatedSelectedLectures,
            error: null,
          };
        });
      }
    } catch (error) {
      set({ error: error.message });
      throw error;
    } finally {
      set({ loading: { ...get().loading, lectures: false } });
    }
  },

  // Update section lectures arrangement
  updateSectionLectures: async (sectionId, lectures) => {
    try {
      const response = await updateSectionLectures(sectionId, lectures);

      // Update both lectures and sections state
      set((state) => ({
        lectures: state.lectures.map((sectionLectures) =>
          sectionLectures.section === sectionId
            ? { ...sectionLectures, lectures }
            : sectionLectures
        ),
        sections: state.sections.map((section) =>
          section.id === sectionId
            ? { ...section, assignedLectures: lectures }
            : section
        ),
      }));

      return response;
    } catch (error) {
      set({ error: error.message });
      throw error;
    }
  },
}));

export default useLectureStore;
