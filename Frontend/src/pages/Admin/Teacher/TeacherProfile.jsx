import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, BookOpen } from "lucide-react";
import { LectureCard } from "../../../components/Admin/LectureCard";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const LECTURES = [
  {
    _id: "66ffddcbcf586b14e9085eb9",
    teacher: "66ffd8423e20756aec481955",
    section: "CSB-34",
    subject: "English",
    day: "Tuesday",
    startTime: "01:00 PM",
    endTime: "02:30 PM",
  },
  {
    _id: "66ffde35a518fabb105555bc",
    teacher: "66ffd8423e20756aec481955",
    section: "CSB-35",
    subject: "English",
    day: "Monday",
    startTime: "01:00 PM",
    endTime: "02:30 PM",
  },
  {
    _id: "66ffe3ebf3e82e34ab4622ce",
    teacher: "66ffd8423e20756aec481955",
    section: "CSB-36",
    subject: "English",
    day: "Friday",
    startTime: "01:00 PM",
    endTime: "02:30 PM",
  },
  {
    _id: "66ffe6455f4e9786e62129a8",
    teacher: "66ffd8423e20756aec481955",
    section: "CSB-37",
    subject: "English",
    day: "Thursday",
    startTime: "01:00 PM",
    endTime: "02:30 PM",
  },
  {
    _id: "66ffe65f99b6179a3cc86a05",
    teacher: "66ffd8423e20756aec481955",
    section: "CSB-38",
    subject: "Saturday",
    day: "Monday",
    startTime: "01:00 PM",
    endTime: "02:30 PM",
  },
];

const SYLLABUS = [
  {
    subject: "Data Structures",
    topics: ["Arrays", "Linked Lists", "Trees", "Graphs", "Hash Tables"],
  },
  {
    subject: "Algorithms",
    topics: [
      "Sorting",
      "Searching",
      "Dynamic Programming",
      "Greedy Algorithms",
    ],
  },
  {
    subject: "Database Systems",
    topics: ["SQL", "Normalization", "Indexing", "Transaction Management"],
  },
  {
    subject: "Web Development",
    topics: ["HTML/CSS", "JavaScript", "React", "Node.js", "RESTful APIs"],
  },
  {
    subject: "Machine Learning",
    topics: [
      "Supervised Learning",
      "Unsupervised Learning",
      "Neural Networks",
      "Deep Learning",
    ],
  },
  {
    subject: "Computer Networks",
    topics: ["OSI Model", "TCP/IP", "Routing", "Network Security"],
  },
];

export default function TeacherProfile() {
  const [teacher] = useState({
    id: "T001",
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    avatar: "/placeholder.svg?height=128&width=128",
    department: "Computer Science",
    position: "Associate Professor",
  });

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={teacher.avatar} alt={teacher.name} />
              <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{teacher.name}</CardTitle>
              <p className="text-gray-500">{teacher.email}</p>
              <div className="flex items-center mt-2 text-sm text-gray-500">
                <GraduationCap className="w-4 h-4 mr-1" />
                {teacher.position}, {teacher.department}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="lectures" className="mt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="lectures">Lectures</TabsTrigger>
              <TabsTrigger value="syllabus">Syllabus</TabsTrigger>
            </TabsList>
            <TabsContent value="lectures" className="mt-6">
              <Tabs defaultValue="monday">
                <div className="flex justify-center">
                  <TabsList>
                    {DAYS.map((day) => (
                      <TabsTrigger value={day.toLowerCase()} key={day}>
                        {day}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>

                {DAYS.map((day) => (
                  <TabsContent key={day} value={day.toLowerCase()}>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 mt-5 mb-3">
                      {LECTURES.filter(
                        (item) => item.day.toLowerCase() === day.toLowerCase()
                      ).map((lecture, index) => (
                        <LectureCard key={index} {...lecture} />
                      ))}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
            <TabsContent value="syllabus" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                {SYLLABUS.map((subject, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        {subject.subject}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {subject.topics.map((topic, topicIndex) => (
                          <li key={topicIndex}>{topic}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
