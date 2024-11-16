import { SectionCard } from "@/components/Admin/Sections/SectionCard";
import {
    CardTitle,
    CardDescription,
    Input,
    Button,
} from "@/components/ui/index.js";
import useSectionsStore from "@/app/useSectionsStore";
import { useEffect, useState } from "react";
import useSectionStore from "../../../app/useSectionStore";

const Sections = () => {
    const {
        sections,
        loading,
        fetchSections,
        searchError,
        noResults,
        searchSections,
        searchedSections,
    } = useSectionsStore();
    const [query, setQuery] = useState("");

    useEffect(() => {
        useSectionStore.setState({
            sectionDetails: {},
            sectionLectures: [],
            sectionStudents: [],
        });
        if (sections.length === 0) {
            fetchSections();
        }
    }, [sections]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    const handleSearch = () => {
        console.log("Searching for sections...");
        useSectionsStore.setState({
            searchedSections: [],
            searchError: "",
        });
        if (query.trim() === "") {
            setQuery("");
            return;
        }
        searchSections(query);
    };

    return (
        <div className="px-10 py-8">
            <div className="flex justify-between mb-7">
                <div>
                    <CardTitle className="text-xl">Sections</CardTitle>
                    <CardDescription>
                        List of all Sections in the college.
                    </CardDescription>
                </div>
                <div>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input
                            type="text"
                            placeholder="Search"
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button
                            size="sm"
                            type="submit"
                            onClick={() => handleSearch()}
                        >
                            Search
                        </Button>
                        <Button size="sm" type="submit">
                            Add New Section
                        </Button>
                    </div>
                </div>
            </div>

            {searchError && noResults && (
                <div className="text-red-500 text-lg mb-3">{searchError}</div>
            )}

            {query.trim() !== "" && searchedSections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {searchedSections.map((section, index) => (
                        <SectionCard
                            key={section._id}
                            section={section}
                            index={index}
                        />
                    ))}
                </div>
            ) : sections.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sections.map((section, index) => (
                        <SectionCard
                            key={section._id}
                            section={section}
                            index={index}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-96 text-lg font-semibold">
                    No Sections found!
                </div>
            )}
        </div>
    );
};

export default Sections;
