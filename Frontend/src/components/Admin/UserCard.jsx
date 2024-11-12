/* eslint-disable react/prop-types */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/index.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/index.js";
import { Badge } from "@/components/ui/index.js";
import { Button } from "@/components/ui/index.js";
import { Progress } from "@/components/ui/index.js";
import { useState } from "react";
import { Link } from "react-router-dom";

export function UserCard({
  className,
  _id,
  firstName,
  lastName,
  email,
  section,
  year,
  image,
}) {
  // eslint-disable-next-line no-unused-vars
  const [randomValue, setRandomValue] = useState(
    Math.floor(Math.random() * 100)
  );
  return (
    <Card className={`w-full max-w-sm ${className}`}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={image} alt={firstName} />
          <AvatarFallback>
            {firstName
              ? firstName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "U"}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <CardTitle>{`${firstName} ${lastName}`}</CardTitle>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Student ID:</span>
            <Badge variant="secondary">{_id}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Year:</span>
            <Badge variant="outline">{year || ""}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Section:</span>
            <Badge variant="outline">{section}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Attendance: </span>
            <Progress value={randomValue} className="my-2 mx-3" />
            <Badge variant="outline">{randomValue}%</Badge>
          </div>
        </div>

        <Link to={`/students/${_id}`}>
          <Button size="sm" className="w-full mt-3">
            Go To Profile
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
