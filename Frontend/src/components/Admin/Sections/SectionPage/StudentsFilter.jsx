import {
    Input,
    Button,
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/index";
import useSectionStore from "@/app/useSectionStore";

const StudentsFilter = () => {
    const {
        studentsStatus,
        searchBy,
        searchQuery,
        searchStudents,
        filterByStatus,
    } = useSectionStore();

    const handleSearch = (query) => {
        useSectionStore.setState({ searchQuery: query, searchError: "" });

        if (!query.trim()) {
            useSectionStore.setState({ searchedStudents: [], searchQuery: "" });
            return;
        }

        if (!searchBy) {
            useSectionStore.setState({
                searchError: "Please select search criteria first",
            });
            return;
        }
        searchStudents(query, searchBy);
    };

    const handleSearchBy = (value) => {
        useSectionStore.setState({ searchError: "", searchBy: value });
        if (searchQuery) {
            handleSearch(searchQuery);
        }
    };

    const handleFilterStudents = (status) => {
        if (studentsStatus === status) {
            useSectionStore.setState({
                searchedStudents: [],
                studentsStatus: "",
            });
            return;
        }
        useSectionStore.setState({
            studentsStatus: status,
        });
        filterByStatus(status);
    };

    const handleClearFilters = () => {
        useSectionStore.setState({
            searchedStudents: [],
            studentsStatus: "",
            searchQuery: "",
        });
    };

    const handleClearSearch = () => {
        useSectionStore.setState({
            searchBy: "",
            searchQuery: "",
            searchError: "",
            searchedStudents: [],
            noResults: false,
        });
    };

    return (
        <>
            <div>
                {["Present", "Absent", "Leave", "Late"].map((status) => (
                    <Button
                        key={status}
                        variant="outline"
                        className={`mx-1 px-3 py-1 ${
                            studentsStatus.toLowerCase() ===
                                status.toLowerCase() && "bg-black text-white"
                        }`}
                        onClick={() => handleFilterStudents(status)}
                    >
                        {status}
                    </Button>
                ))}
                <Button
                    variant="outline"
                    className="mx-1 px-3 py-1"
                    onClick={() => handleClearFilters()}
                >
                    Clear
                </Button>
            </div>
            <div>
                <div className="flex w-full items-center space-x-2">
                    <Select onValueChange={handleSearchBy} value={searchBy}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Select By" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="firstName">
                                First Name
                            </SelectItem>
                            <SelectItem value="lastName">Last Name</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {(searchQuery || searchBy) && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleClearSearch}
                        >
                            Clear
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default StudentsFilter;
