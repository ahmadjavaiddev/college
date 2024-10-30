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

      set({
        sectionDetails: sectionResponse,
        students: studentsResponse,
        lectures: lecturesResponse,
        loading: { section: false, students: false, lectures: false },
      });
    } catch (error) {
      console.error("Error fetching section data:", error);
      set({ loading: { section: false, students: false, lectures: false } });
    }
  },

  // Search functionality
  searchStudents: (query, studentsList) => {
    if (!query) return studentsList;
    return studentsList.filter((student) =>
      student.firstName.toLowerCase().includes(query.toLowerCase())
    );
  },
}));

export default useSectionStore;
