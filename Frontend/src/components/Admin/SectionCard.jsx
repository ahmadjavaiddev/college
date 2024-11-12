import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/index.js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/index.js";
import { Badge } from "@/components/ui/index.js";

// eslint-disable-next-line react/prop-types
export function SectionCard({ name, email, branch, avatarUrl }) {
    return (
        <Card className="w-full max-w-sm hover:cursor-pointer">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14">
                    <AvatarImage src={avatarUrl} alt={name} />
                    <AvatarFallback>
                        {name
                            ? name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                                  .toUpperCase()
                            : "U"}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <CardTitle>{name || "Unknown User"}</CardTitle>
                    <p className="text-sm text-muted-foreground">{email}</p>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Incharge:</span>
                        <Badge variant="secondary">{name}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Student ID:</span>
                        <Badge variant="secondary">{name}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Branch:</span>
                        <Badge variant="outline">{branch}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Total Students:</span>
                        <Badge variant="outline">{branch.split("").length}</Badge>
                    </div>
                </div>
                {/* <Button size="sm" className="w-full mt-3">
                    Go To Profile
                </Button> */}
            </CardContent>
        </Card>
    );
}
