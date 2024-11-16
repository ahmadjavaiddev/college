import axios from "axios";
import { useAuthStore } from "../app/AuthStore";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URI,
    withCredentials: true,
    timeout: 120000,
});

apiClient.interceptors.request.use((config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const loginAdmin = async (data) => {
    try {
        const response = await apiClient.post("/admin/login", data);
        return response.data;
    } catch (error) {
        console.log("Error :: API :: loginAdmin ::", error.message);
    }
};

const verifyUser = async () => {
    return apiClient.get("/admin");
};

const getSectionDetails = async (sectionId) => {
    try {
        const response = await apiClient.get(`/sections/${sectionId}`);
        return response.data.data.section;
    } catch (error) {
        console.log("Error :: API :: getSectionDetails ::", error.message);
    }
};

const getSectionStudents = async (sectionId) => {
    try {
        const response = await apiClient.get(`/students/sections/${sectionId}`);
        return response.data.data;
    } catch (error) {
        console.log("Error :: API :: getSectionStudents ::", error.message);
    }
};

const getSectionLectures = async (sectionId) => {
    return apiClient.get(`/lectures/sections/${sectionId}`);
};

const addStudentRequest = async (data) => {
    const response = await apiClient.post("/students/register", data);
    return response.data;
};

const getFormFieldsData = async () => {
    const response = await apiClient.get("/random/data/form");
    return response.data.data;
};

const getExistingStudents = async () => {
    const response = await apiClient.get("/students");
    return response.data.data.students;
};

const getStudentData = async (userId) => {
    return apiClient.get(`/students/${userId}`);
};

const getLectureData = async (sectionId) => {
    const response = await apiClient.get(
        `/students/sections/${sectionId}/lecture`
    );
    return response.data.data.students;
};

const submitAttendance = async (sectionId, lectureId, data) => {
    const response = await apiClient.post(`/attendance/mark`, {
        sectionId,
        lectureId,
        attendanceRecords: data,
    });
    return response.data;
};

const addTeacherRequest = async (data) => {
    const response = await apiClient.post("/teachers/register", data);
    return response.data;
};

const getTeachersFormData = async () => {
    return apiClient.get("/random/teachers/form");
};

const getSectionsWithDetails = async () => {
    return apiClient.get("/sections/names");
};

const getSections = async () => {
    return apiClient.get("/sections");
};

const updateLecture = async (lectureId, lecture) => {
    return apiClient.put(`/lectures/${lectureId}`, lecture);
};

const addNewLecture = async (sectionId, data) => {
    return apiClient.post(`/lectures/${sectionId}/add`, data);
};

const updateSectionLectures = async (sectionId, lectures) => {
    return apiClient.put(`/lectures/sections/${sectionId}`, lectures);
};

const deleteLecture = async (lectureId) => {
    return apiClient.delete(`/lectures/${lectureId}`);
};

export {
    loginAdmin,
    verifyUser,
    getSectionDetails,
    getSectionStudents,
    getSectionLectures,
    addStudentRequest,
    getFormFieldsData,
    getExistingStudents,
    getStudentData,
    getLectureData,
    submitAttendance,
    addTeacherRequest,
    getTeachersFormData,
    getSectionsWithDetails,
    getSections,
    updateLecture,
    addNewLecture,
    updateSectionLectures,
    deleteLecture,
};
