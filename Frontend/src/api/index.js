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
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const loginAdmin = async (data) => {
  const response = await apiClient.post("/admin/login", data);
  return response.data;
};

const getSectionDetails = async () => {
  const response = await apiClient.get("/sections/66ffd8503e20756aec48195a");
  return response.data.data.section;
};

const getSectionStudents = async (sectionId) => {
  const response = await apiClient.get(`/students/sections/${sectionId}`);
  return response.data.data.students;
};

const getSectionLectures = async () => {
  const response = await apiClient.get(
    "/lectures/sections/66ffd8503e20756aec48195a"
  );
  return response.data.data.lectures.lectures;
};

const addStudentRequest = async (data) => {
  const response = await apiClient.post("/students/register", data);
  console.log("Student ::", response.data);
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
  console.log("response.data ::", response.data);
  return response.data;
};

export {
  loginAdmin,
  getSectionDetails,
  getSectionStudents,
  getSectionLectures,
  addStudentRequest,
  getFormFieldsData,
  getExistingStudents,
  getStudentData,
  getLectureData,
  submitAttendance,
};
