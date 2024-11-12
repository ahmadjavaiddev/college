import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/index.js";
import { Input } from "@/components/ui/index.js";
import { Button } from "@/components/ui/index.js";
import { SectionCard } from "./SectionCard";

const sections = [
    {
        name: "CSB-25",
        email: "alice.johnson@example.com",
        branch: "Computer Science",
        section: "CS-A",
        sectionId: "CS001",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "CSB-24",
        email: "bob.smith@example.com",
        branch: "Electrical Engineering",
        section: "EE-B",
        sectionId: "EE001",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "CSB-30",
        email: "charlie.brown@example.com",
        branch: "Mechanical Engineering",
        section: "ME-C",
        sectionId: "ME001",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "CSB-35",
        email: "diana.ross@example.com",
        branch: "Computer Science",
        section: "CS-B",
        sectionId: "CS002",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "CSB-34",
        email: "ethan.hunt@example.com",
        branch: "Electrical Engineering",
        section: "EE-A",
        sectionId: "EE002",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
        name: "CSB-38",
        email: "fiona.gallagher@example.com",
        branch: "Mechanical Engineering",
        section: "ME-B",
        sectionId: "ME002",
        avatarUrl: "/placeholder.svg?height=40&width=40",
    },
];

const SectionsTab = () => {
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between">
                    <div>
                        <CardTitle>Sections</CardTitle>
                        <CardDescription>List of all sections in the college.</CardDescription>
                    </div>
                    <div>
                        <div className="flex w-full max-w-sm items-center space-x-2">
                            <Input type="text" placeholder="Search" />
                            <Button size="sm" type="submit">
                                Search
                            </Button>
                            <Button size="sm" type="submit">
                                Add New Sections
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
                    {sections.map((section) => (
                        <SectionCard key={section.sectionId} {...section} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export { SectionsTab };
