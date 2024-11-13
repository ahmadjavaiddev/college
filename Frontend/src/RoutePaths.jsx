import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./layouts/PageLayout";
import HomePage from "./pages/Home/HomePage";
import Sections from "./pages/Admin/Sections/Sections";
import SectionPage from "./pages/Admin/Sections/SectionPage";
import StudentProfile from "./pages/Admin/Students/StudentProfile";
import { AddStudent } from "./pages/Admin/Students/AddStudent";
import Students from "./pages/Admin/Students/Students";
import AddSection from "./pages/Admin/Sections/AddSection";
import { Login } from "./pages/Login";
import AttendanceMarker from "./pages/Admin/Attendance/Attendance";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import TeacherProfile from "./pages/Admin/Teacher/TeacherProfile";
import { AddTeacher } from "./pages/Admin/Teacher/AddTeacher";
import Lectures from "./pages/Admin/Lectures/Lectures";
import { useAuthStore } from "./app/AuthStore";
import { useLoadingStore } from "./app/LoadingStore";
import { useEffect } from "react";

const RoutePaths = () => {
    const { accessToken, userRole, verify } = useAuthStore();
    const { setLoading } = useLoadingStore();

    useEffect(() => {
        const userAuthentication = async () => {
            try {
                if (accessToken && userRole) {
                    await verify();
                }
                setLoading(false);
            } catch (error) {
                console.error("RoutePaths error:", error);
            }
        };
        userAuthentication();
    }, [setLoading]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<PageLayout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/teachers/add"
                        element={
                            <ProtectedRoute
                                role={["ADMIN"]}
                                element={AddTeacher}
                            />
                        }
                    />
                    <Route
                        path="/teachers/:teacherId"
                        element={
                            <ProtectedRoute
                                role={["ADMIN"]}
                                element={TeacherProfile}
                            />
                        }
                    />
                    <Route
                        path="/sections/:sectionId/attendance/:lectureId"
                        element={<AttendanceMarker />}
                    />
                    <Route path="/sections" element={<Sections />} />
                    <Route
                        path="/sections/:sectionId"
                        element={
                            <ProtectedRoute
                                role={["ADMIN"]}
                                element={SectionPage}
                            />
                        }
                    />
                    <Route
                        path="/sections/add"
                        element={
                            <ProtectedRoute
                                role={["ADMIN"]}
                                element={AddSection}
                            />
                        }
                    />
                    <Route
                        path="/lectures"
                        element={
                            <ProtectedRoute
                                role={["ADMIN"]}
                                element={Lectures}
                            />
                        }
                    />
                    <Route
                        path="/students"
                        element={
                            <ProtectedRoute
                                role={["ADMIN"]}
                                element={Students}
                            />
                        }
                    />
                    <Route
                        path="/students/:userId"
                        element={
                            <ProtectedRoute
                                role={["ADMIN"]}
                                element={StudentProfile}
                            />
                        }
                    />
                    <Route
                        path="/students/add"
                        element={
                            <ProtectedRoute
                                role={["ADMIN"]}
                                element={AddStudent}
                            />
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default RoutePaths;
