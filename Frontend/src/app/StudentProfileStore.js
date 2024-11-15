import { create } from "zustand";
import { requestHandler } from "../utils";
import { getStudentData } from "../api";

export const useStudentProfileStore = create((set, get) => ({
    students: [],
    student: {},
    loading: true,

    fetchStudent: async (studentId) => {
        const studentInState = get().students.find(
            (student) => student._id === studentId
        );

        if (studentInState) {
            set({ student: studentInState, loading: false });
            return studentInState;
        }

        await requestHandler(
            async () => await getStudentData(studentId),
            (res) => {
                const students = [...get().students, res.user];
                set({ students: students, student: res.user, loading: false });
            },
            () => set({ student: null, loading: false }),
            null,
            "Student not found"
        );

        const fetchedStudent = get().student;
        return fetchedStudent;
    },
}));
