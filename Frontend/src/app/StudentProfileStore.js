import { create } from "zustand";

export const useStudentProfileStore = create((set) => ({
    student: {},

    setStudent: (studentData) =>
        set(() => ({
            student: studentData,
        })),
}));
