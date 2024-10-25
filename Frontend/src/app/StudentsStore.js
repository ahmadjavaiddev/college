import { create } from "zustand";

export const useStudentsStore = create((set) => ({
    students: [],

    addStudents: (studentsData) =>
        set(() => ({
            students: studentsData,
        })),
}));
