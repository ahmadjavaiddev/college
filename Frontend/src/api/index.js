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
    try {
        const response = await apiClient.get("/admin/");
        return response.data.data.user;
    } catch (error) {
        console.log("Error :: API :: verifyUser ::", error.message);
    }
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
    try {
        const response = await apiClient.get(`/lectures/sections/${sectionId}`);
        return response.data.data.lectures;
    } catch (error) {
        console.log("Error :: API :: getSectionLectures ::", error.message);
    }
};

const addStudentRequest = async (data) => {
    try {
        const response = await apiClient.post("/students/register", data);
        return response.data;
    } catch (error) {
        console.log("Error :: API :: addStudentRequest ::", error.message);
    }
};

const getFormFieldsData = async () => {
    try {
        const response = await apiClient.get("/random/data/form");
        return response.data.data;
    } catch (error) {
        console.log("Error :: API :: getFormFieldsData ::", error.message);
    }
};

const getExistingStudents = async () => {
    try {
        const response = await apiClient.get("/students");
        return response.data.data.students;
    } catch (error) {
        console.log("Error :: API :: getExistingStudents ::", error.message);
    }
};

const getStudentData = async (userId) => {
    try {
        const response = await apiClient.get(`/students/${userId}`);
        return response.data.data.user;
    } catch (error) {
        console.log("Error :: API :: getStudentData ::", error.message);
    }
};

const getLectureData = async (sectionId) => {
    try {
        const response = await apiClient.get(
            `/students/sections/${sectionId}/lecture`
        );
        return response.data.data.students;
    } catch (error) {
        console.log("Error :: API :: getLectureData ::", error.message);
    }
};

const submitAttendance = async (sectionId, lectureId, data) => {
    try {
        const response = await apiClient.post(`/attendance/mark`, {
            sectionId,
            lectureId,
            attendanceRecords: data,
        });
        return response.data;
    } catch (error) {
        console.log("Error :: API :: submitAttendance ::", error.message);
    }
};

const addTeacherRequest = async (data) => {
    try {
        const response = await apiClient.post("/teachers/register", data);
        return response.data;
    } catch (error) {
        console.log("Error :: API :: addTeacherRequest ::", error.message);
    }
};

const getSections = async () => {
    try {
        const response = await apiClient.get("/sections");
        return response.data.data.sections;
    } catch (error) {
        console.log("Error :: API :: getSections ::", error.message);
    }
};

const updateLecture = async (lectureId, lecture) => {
    try {
        const response = await apiClient.put(`/lectures/${lectureId}`, lecture);
        return response.data.data.lecture;
    } catch (error) {
        console.log("Error :: API :: updateLecture ::", error.message);
    }
};

const updateSectionLectures = async (sectionId, lectures) => {
    try {
        const response = await apiClient.put(
            `/lectures/sections/${sectionId}`,
            lectures
        );
        return response.data.data.lectures;
    } catch (error) {
        console.log("Error :: API :: updateSectionLectures ::", error.message);
    }
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
    getSections,
    updateLecture,
    updateSectionLectures,
};
