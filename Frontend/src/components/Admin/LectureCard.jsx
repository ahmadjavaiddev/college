import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SquareArrowOutUpRight } from "lucide-react";

// eslint-disable-next-line react/prop-types
export function LectureCard({
  className,
  _id,
  section,
  startTime,
  endTime,
  subject,
}) {
  return (
    <Card className={`w-full max-w-sm ${className}`}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={""} alt={section} />
          <AvatarFallback>
            {section
              ? section
                  // eslint-disable-next-line react/prop-types
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{section || "Unknown User"}</CardTitle>
          <p className="text-sm text-muted-foreground">{subject}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Teacher:</span>
            <Badge variant="secondary">English</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Start Time:</span>
            <Badge variant="outline">{startTime}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">End Time:</span>
            <Badge variant="outline">{endTime}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Mark Attendance:</span>
            {/* <Link to={`/sections/${section}/attendance/${_id}`}> */}
            <Link to={`/sections/66ffd8503e20756aec48195a/attendance/${_id}`}>
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
