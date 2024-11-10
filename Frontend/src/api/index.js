import axios from "axios";
import { useAuthStore } from "../app/AuthStore";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

// apiClient.interceptors.request.use(
//     function (config) {
//         // Retrieve user token from local storage
//         const token = LocalStorage.get("accessToken");
//         // Set authorization header with bearer token
//         config.headers.Authorization = `Bearer ${token}`;
//         return config;
//     },
//     function (error) {
//         return Promise.reject(error);
//     }
// );

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const loginAdmin = async (data) => {
  const response = await apiClient.post("/admin/login", data);
  return response.data;
};

const verifyUser = async () => {
  const response = await apiClient.get("/admin/");
  return response.data.data.user;
};

const getSectionDetails = async (sectionId) => {
  const response = await apiClient.get(`/sections/${sectionId}`);
  return response.data.data.section;
};

const getSectionStudents = async (sectionId) => {
  const response = await apiClient.get(`/students/sections/${sectionId}`);
  return response.data.data;
};

const getSectionLectures = async (sectionId) => {
  try {
    const response = await apiClient.get(`/lectures/sections/${sectionId}`);
    return response.data.data.lectures;
  } catch (error) {
    console.log("Error :: getSectionLectures ::", error.message);
  }
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
  const response = await apiClient.get(`/students/${userId}`);
  return response.data.data.user;
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

const getSections = async () => {
  const response = await apiClient.get("/sections");
  return response.data.data.sections;
};

const updateLecture = async (lectureId, lecture) => {
  const response = await apiClient.put(`/lectures/${lectureId}`, lecture);
  return response.data.data.lecture;
};

const updateSectionLectures = async (sectionId, lectures) => {
  const response = await apiClient.put(
    `/lectures/sections/${sectionId}`,
    lectures
  );
  console.log("updateSectionLectures ::", response.data.data.lectures);
  return response.data.data.lectures;
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
