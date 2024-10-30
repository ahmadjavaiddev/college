import { useEffect, useState } from "react";
import { UserCard } from "@/components/Admin/UserCard";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Input,
  Button,
  Badge,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Skeleton,
} from "@/components/ui/index";
import { RefreshCcw } from "lucide-react";
import { LectureCard } from "@/components/Admin/LectureCard";
import { AddStudent as AddStudentComponent } from "../Students/AddStudent";
import { motion } from "framer-motion";
import SidebarLoading from "@/components/Admin/SidebarLoading";
import useSectionStore from "@/app/useSectionStore";
import { useParams } from "react-router-dom";

export default function SectionPage() {
  const [activeTab, setActiveTab] = useState("students");
  const [studentsStatus, setStudentsStatus] = useState("");
  const [searchedStudents, setSearchedStudents] = useState([]);
  const { sectionId } = useParams();
  const {
    sectionDetails,
    students,
    lectures,
    loading,
    fetchSectionData,
    searchStudents,
  } = useSectionStore();

  useEffect(() => {
    fetchSectionData(sectionId);
  }, [sectionId]);

  const handleSearch = (query) => {
    const response = searchStudents(query, students);
    setSearchedStudents(response);
  };

  return (
    <div className="container mx-auto px-10 py-6">
      <div className="flex justify-between align-middle items-start gap-6">
        <Card className="sticky top-16 w-[20%]">
          <CardHeader className="flex flex-row gap-4 items-center">
            {loading.sectionLoading ? (
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-4 w-[100px]" />
                </div>
              </div>
            ) : (
              <>
                <Avatar className="h-14 w-14">
                  <AvatarImage
                    src={"/placeholder.svg?height=40&width=40"}
                    alt={sectionDetails?.name}
                  />
                  <AvatarFallback>{sectionDetails?.name}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <CardTitle className="text-lg">
                    {sectionDetails?.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {sectionDetails?.name}
                  </p>
                </div>
              </>
            )}
          </CardHeader>
          <CardContent>
            {loading.sectionLoading ? (
              <SidebarLoading />
            ) : (
              <div>
                <div className="flex justify-between">
                  <span className="font-medium">Incharge:</span>
                  <Badge
                    variant="outline"
                    className="text-sm rounded-xl px-3 py-0 mt-1 font-bold"
                  >
                    {sectionDetails?.incharge?.name}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Branch:</span>
                  <Badge
                    variant="outline"
                    className="text-sm rounded-xl px-3 py-0 mt-1 font-bold"
                  >
                    {sectionDetails?.branch?.name}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total Students:</span>
                  <Badge
                    variant="outline"
                    className="text-sm rounded-xl px-3 py-0 mt-1 font-bold"
                  >
                    {sectionDetails?.totalStudents || 0}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Present Students:</span>
                  <Badge
                    variant="outline"
                    className="text-sm rounded-xl px-3 py-0 mt-1 font-bold bg-[#229588] text-white"
                  >
                    {sectionDetails?.presentStudents || 0}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Absent Students:</span>
                  <Badge
                    variant="outline"
                    className="text-sm rounded-xl px-3 py-0 mt-1 font-bold bg-red-600 text-white"
                  >
                    {sectionDetails?.absentStudents || 0}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="px-5 py-3 w-[80%]">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="flex justify-between">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="lectures">Lectures</TabsTrigger>
              </TabsList>
              <Button
                variant="outline"
                size="sm"
                className="mr-2"
                onClick={() => fetchSectionData(sectionId)}
              >
                <RefreshCcw width={18} />
              </Button>
            </div>

            <TabsContent value="students" className="space-y-4">
              <div className="flex justify-between mt-3 mb-7 px-2">
                <CardTitle className="text-xl">Students</CardTitle>
                <div>
                  {["Present", "Absent", "Leave", "Short Leave"].map(
                    (status) => (
                      <Button
                        key={status}
                        variant="outline"
                        className={`mx-1 px-3 py-1 ${
                          studentsStatus.toLowerCase() ===
                            status.toLowerCase() && "bg-black text-white"
                        }`}
                        onClick={() => setStudentsStatus(status.toLowerCase())}
                      >
                        {status}
                      </Button>
                    )
                  )}
                  <Button
                    variant="outline"
                    className="mx-1 px-3 py-1"
                    onClick={() => setStudentsStatus("")}
                  >
                    Clear
                  </Button>
                </div>
                <div>
                  <div className="flex w-full items-center space-x-2">
                    <Input
                      type="text"
                      placeholder="Search"
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    <Dialog>
                      <DialogTrigger className="w-full bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 h-8 rounded-md px-0 text-xs">
                        Add New Student
                      </DialogTrigger>
                      <DialogContent className="max-w-5xl py-0 pb-5">
                        <DialogTitle className="w-0 h-0 p-0 m-0 text-sm"></DialogTitle>
                        <AddStudentComponent
                          sectionIdToSelect={sectionDetails?._id}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
              {studentsStatus && (
                <div>
                  Number of
                  <b className="mx-1">
                    {studentsStatus.charAt(0).toUpperCase() +
                      studentsStatus.slice(1)}
                  </b>
                  Students are <b>{students.length}</b>
                </div>
              )}

              {loading.studentsLoading ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-3"
                >
                  {[1, 2, 3, 4, 5].map((item) => (
                    <Card key={item} className="py-4 px-4">
                      <div className="flex items-center space-x-4 mb-8">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-[180px]" />
                          <Skeleton className="h-4 w-[130px]" />
                        </div>
                      </div>
                      {[1, 2].map((item) => (
                        <div key={item} className="mb-3">
                          <div className="flex justify-between mb-2">
                            <Skeleton className="h-4 w-[150px]" />
                            <Skeleton className="h-4 w-[100px]" />
                          </div>
                          <div className="flex justify-between">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[80px]" />
                          </div>
                        </div>
                      ))}
                      <Skeleton className="mt-2 h-7 w-full" />
                    </Card>
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
                  {searchedStudents.length > 0
                    ? searchedStudents.map((student) => (
                        <UserCard key={student._id} {...student} />
                      ))
                    : students.map((student) => (
                        <UserCard key={student._id} {...student} />
                      ))}
                </motion.div>
              )}
            </TabsContent>

            <TabsContent value="lectures">
              <Tabs defaultValue="monday">
                <div className="flex justify-center">
                  <TabsList>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ].map((day) => (
                      <TabsTrigger value={day.toLowerCase()} key={day}>
                        {day}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {[
                  "monday",
                  "tuesday",
                  "wednesday",
                  "thursday",
                  "friday",
                  "saturday",
                ].map((day) => (
                  <TabsContent key={day} value={day}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-3"
                    >
                      {lectures
                        .filter((item) => item.day.toLowerCase() === day)
                        .flatMap((item) => item.subjects)
                        .map((lecture) => (
                          <LectureCard key={lecture._id} {...lecture} />
                        ))}
                    </motion.div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
