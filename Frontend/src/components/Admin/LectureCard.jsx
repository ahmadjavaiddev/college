import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";

// eslint-disable-next-line react/prop-types
export function LectureCard({ className, lecture, sectionId }) {
  return (
    <Card className={`w-full max-w-sm ${className}`}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={""} alt={lecture?.subject} />
          <AvatarFallback>
            {lecture.subject
              ? lecture.subject
                  // eslint-disable-next-line react/prop-types
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{lecture.subject || "Unknown User"}</CardTitle>
          <p className="text-sm text-muted-foreground">{lecture.subject}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Teacher:</span>
            <Badge variant="secondary">{lecture.teacher.name}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Start Time:</span>
            <Badge variant="outline">
              {lecture?.time?.split("To")[0]?.trim()}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">End Time:</span>
            <Badge variant="outline">
              {lecture?.time?.split("To")[1]?.trim()}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Mark Attendance:</span>
            <Link to={`/sections/${sectionId}/attendance/${lecture?._id}`}>
              {/* <Link
              to={`/sections/66ffd8503e20756aec48195a/attendance/${lecture._id}`}
            > */}
              <Badge variant="outline">
                <SquareArrowOutUpRight className="w-4 h-4" />
              </Badge>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
