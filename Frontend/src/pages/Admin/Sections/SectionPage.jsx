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
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/index";
import { RefreshCcw } from "lucide-react";
import { LectureCard } from "@/components/Admin/LectureCard";
import { AddStudent as AddStudentComponent } from "../Students/AddStudent";
import { motion } from "framer-motion";
import SidebarLoading from "@/components/Admin/SidebarLoading";
import useSectionStore from "@/app/useSectionStore";
import { useParams } from "react-router-dom";
import StudentCardLoading from "../../../components/Admin/StudentCardLoading";

export default function SectionPage() {
  const [activeTab, setActiveTab] = useState("students");
  const [studentsStatus, setStudentsStatus] = useState("");
  const [searchedStudents, setSearchedStudents] = useState([]);
  const [searchBy, setSearchBy] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [noResults, setNoResults] = useState(false);
  const { sectionId } = useParams();
  const {
    sectionDetails,
    students,
    lectures,
    loading,
    fetchSectionData,
    searchStudents,
    filterByStatus,
  } = useSectionStore();

  useEffect(() => {
    let isSubscribed = true;

    const loadData = async () => {
      if (isSubscribed) {
        await fetchSectionData(sectionId);
      }
    };

    loadData();

    return () => {
      isSubscribed = false;
    };
  }, [sectionId, fetchSectionData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchError("");
    setNoResults(false);

    if (!query.trim()) {
      setSearchedStudents([]);
      return;
    }

    if (!searchBy) {
      setSearchError("Please select search criteria first");
      return;
    }

    const response = searchStudents(query, searchBy, students);
    setSearchedStudents(response);

    if (response.length === 0) {
      setNoResults(true);
    }
  };

  const handleSearchBy = (value) => {
    setSearchBy(value);
    setSearchError("");
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  };

  const handleFilterStudents = (status) => {
    if (studentsStatus === status) {
      setStudentsStatus("");
      setSearchedStudents([]);
      return;
    }
    setStudentsStatus(status);
    const response = filterByStatus(status, students);
    setSearchedStudents(response);
  };

  const handleClearFilters = () => {
    setSearchedStudents([]);
    setStudentsStatus("");
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setSearchBy("");
    setSearchError("");
    setNoResults(false);
    setSearchedStudents([]);
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
    handleClearSearch();
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
                  <AvatarFallback>
                    {sectionDetails?.name?.split("-")[0]}
                  </AvatarFallback>
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
                    {sectionDetails?.attendanceDetails.totalStudents || 0}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Present Students:</span>
                  <Badge
                    variant="outline"
                    className="text-sm rounded-xl px-3 py-0 mt-1 font-bold bg-[#229588] text-white"
                  >
                    {sectionDetails?.attendanceDetails.present || 0}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Absent Students:</span>
                  <Badge
                    variant="outline"
                    className="text-sm rounded-xl px-3 py-0 mt-1 font-bold bg-red-600 text-white"
                  >
                    {sectionDetails?.attendanceDetails.absent || 0}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="px-5 py-3 w-[80%]">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <div className="flex justify-between">
              <TabsList>
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="lectures">Lectures</TabsTrigger>
              </TabsList>
              {searchError && (
                <p className="text-sm text-red-500 mt-1">{searchError}</p>
              )}
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger className="w-full bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 h-8 rounded-md px-6 text-xs">
                    Add New Student
                  </DialogTrigger>
                  <DialogContent className="max-w-5xl py-0 pb-5">
                    <DialogTitle className="w-0 h-0 p-0 m-0 text-sm"></DialogTitle>
                    <AddStudentComponent
                      sectionIdToSelect={sectionDetails?._id}
                    />
                  </DialogContent>
                </Dialog>
                <Button
                  variant="outline"
                  size="sm"
                  className="mr-2"
                  onClick={() => fetchSectionData(sectionId)}
                >
                  <RefreshCcw width={18} />
                </Button>
              </div>
            </div>

            <TabsContent value="students" className="space-y-4">
              <div className="flex justify-between mt-3 mb-7 px-2">
                <CardTitle className="text-xl">Students</CardTitle>
                <div>
                  {["Present", "Absent", "Leave", "Late"].map((status) => (
                    <Button
                      key={status}
                      variant="outline"
                      className={`mx-1 px-3 py-1 ${
                        studentsStatus.toLowerCase() === status.toLowerCase() &&
                        "bg-black text-white"
                      }`}
                      onClick={() => handleFilterStudents(status)}
                    >
                      {status}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    className="mx-1 px-3 py-1"
                    onClick={() => handleClearFilters()}
                  >
                    Clear
                  </Button>
                </div>
                <div>
                  <div className="flex w-full items-center space-x-2">
                    <Select onValueChange={handleSearchBy} value={searchBy}>
                      <SelectTrigger className="w-[120px]">
                        <SelectValue placeholder="Select By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="firstName">First Name</SelectItem>
                        <SelectItem value="lastName">Last Name</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="text"
                      placeholder="Search"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                    {(searchQuery || searchBy) && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleClearSearch}
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </div>
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
                        .map((lecture) => (
                          <LectureCard
                            key={lecture?._id}
                            lecture={lecture}
                            sectionId={sectionId}
                          />
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
