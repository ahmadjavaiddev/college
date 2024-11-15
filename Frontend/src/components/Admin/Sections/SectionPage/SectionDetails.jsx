import {
    Avatar,
    AvatarImage,
    AvatarFallback,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Badge,
    Skeleton,
} from "@/components/ui/index";
import SidebarLoading from "@/components/Admin/SidebarLoading";
import useSectionStore from "../../../../app/useSectionStore";

const SectionDetails = () => {
    const { sectionDetails, loading } = useSectionStore();

    return (
        <Card className="sticky top-16 w-[20%]">
            <CardHeader className="flex flex-row gap-4 items-center">
                {loading.section ? (
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
                                {sectionDetails?.incharge?.firstName}{" "}
                                {sectionDetails?.incharge?.lastName}
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
                                {sectionDetails?.attendanceDetails
                                    ?.totalStudents || 0}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">
                                Present Students:
                            </span>
                            <Badge
                                variant="outline"
                                className="text-sm rounded-xl px-3 py-0 mt-1 font-bold bg-[#229588] text-white"
                            >
                                {sectionDetails?.attendanceDetails?.present ||
                                    0}
                            </Badge>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium">
                                Absent Students:
                            </span>
                            <Badge
                                variant="outline"
                                className="text-sm rounded-xl px-3 py-0 mt-1 font-bold bg-red-600 text-white"
                            >
                                {sectionDetails?.attendanceDetails?.absent || 0}
                            </Badge>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default SectionDetails;
