import { useEffect, useState } from "react";
import { RefreshCcw } from "lucide-react";
import { useParams } from "react-router-dom";
import {
    Card,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/index";
import { AddStudent as AddStudentComponent } from "../Students/AddStudent";
import useSectionStore from "@/app/useSectionStore";
import SectionDetails from "@/components/Admin/Sections/SectionPage/SectionDetails";
import SectionLectures from "@/components/Admin/Sections/SectionPage/SectionLectures";
import SectionStudentsTab from "@/components/Admin/Sections/SectionPage/SectionStudentsTab";

export default function SectionPage() {
    const [activeTab, setActiveTab] = useState("students");
    const { sectionId } = useParams();
    const { searchError, sectionDetails, fetchSectionData } = useSectionStore();

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

    const handleTabChange = (value) => {
        setActiveTab(value);
    };

    return (
        <div className="container mx-auto px-10 py-6">
            <div className="flex justify-between align-middle items-start gap-6">
                <SectionDetails />
                <Card className="px-5 py-3 w-[80%]">
                    <Tabs value={activeTab} onValueChange={handleTabChange}>
                        <div className="flex justify-between">
                            <TabsList>
                                <TabsTrigger value="students">
                                    Students
                                </TabsTrigger>
                                <TabsTrigger value="lectures">
                                    Lectures
                                </TabsTrigger>
                            </TabsList>
                            {searchError && (
                                <p className="text-sm text-red-500 mt-1">
                                    {searchError}
                                </p>
                            )}
                            <div className="flex gap-2">
                                <Dialog>
                                    <DialogTrigger className="w-full bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 h-8 rounded-md px-6 text-xs">
                                        Add New Student
                                    </DialogTrigger>
                                    <DialogContent className="max-w-5xl py-0 pb-5">
                                        <DialogTitle className="w-0 h-0 p-0 m-0 text-sm"></DialogTitle>
                                        <AddStudentComponent
                                            sectionIdToSelect={
                                                sectionDetails?._id
                                            }
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
                            <SectionStudentsTab />
                        </TabsContent>
                        <TabsContent value="lectures">
                            <SectionLectures />
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
}
