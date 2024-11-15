import { CardTitle } from "@/components/ui/index";
import { UserCard } from "@/components/Admin/UserCard";
import { motion } from "framer-motion";
import useSectionStore from "@/app/useSectionStore";
import StudentCardLoading from "../../StudentCardLoading";
import StudentsFilter from "./StudentsFilter";

const SectionStudentsTab = () => {
    const {
        studentsStatus,
        searchQuery,
        searchedStudents,
        noResults,
        sectionStudents,
        loading,
    } = useSectionStore();

    return (
        <>
            <div className="flex justify-between mt-3 mb-7 px-2">
                <CardTitle className="text-xl">Students</CardTitle>
                <StudentsFilter />
            </div>
            {noResults && searchQuery && (
                <p className="text-lg text-muted-foreground mt-2">
                    No results found for "{searchQuery}"
                </p>
            )}
            {loading.students ? (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-3"
                >
                    {[1, 2, 3, 4, 5].map((item) => (
                        <StudentCardLoading key={item} />
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-3"
                >
                    {searchedStudents.length > 0 || studentsStatus
                        ? searchedStudents.map((student) => (
                              <UserCard key={student._id} {...student} />
                          ))
                        : sectionStudents.map((student) => (
                              <UserCard key={student._id} {...student} />
                          ))}
                </motion.div>
            )}
        </>
    );
};

export default SectionStudentsTab;
