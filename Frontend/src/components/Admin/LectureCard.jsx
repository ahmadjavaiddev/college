import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// eslint-disable-next-line react/prop-types
export function LectureCard({ className, subject, time }) {
    return (
        <Card className={`w-full max-w-sm ${className}`}>
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14">
                    <AvatarImage src={""} alt={subject} />
                    <AvatarFallback>
                        {subject
                            ? subject
                                  // eslint-disable-next-line react/prop-types
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                            : "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <CardTitle>{subject || "Unknown User"}</CardTitle>
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
                        <Badge variant="outline">{time?.split("To")[0].trim()}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">End Time:</span>
                        <Badge variant="outline">{time?.split("To")[1].trim()}</Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
