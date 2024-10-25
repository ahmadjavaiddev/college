import { useState, useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import AvatarEditor from "react-avatar-editor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCard } from "../../../components/Admin/UserCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { addStudentRequest, getExistingStudents, getFormFieldsData } from "../../../api";

export const AddStudent = ({ sectionIdToSelect }) => {
    const [studentData, setStudentData] = useState({
        firstName: "",
        lastName: "",
        discipline: "",
        year: "",
        metricMarks: "",
        sectionId: sectionIdToSelect || "",
        dateOfBirth: "",
        address: "",
        phoneNumber: "",
        parentsName: "",
        email: "",
        city: "",
        studentProfile: "",
    });

    const [image, setImage] = useState(null);
    const [scale, setScale] = useState(1);
    const editorRef = useRef(null);
    const [dateOfBirth, setDateOfBirth] = useState();
    const [cropped, setCropped] = useState(false);
    const [searchQueryType, setSearchQueryType] = useState("");
    const [searchQueryValue, setSearchQueryValue] = useState("");
    const [formFieldsData, setFormFieldsData] = useState([]);
    const [existingStudents, setExistingStudents] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const formFieldsDataResponse = await getFormFieldsData();
                const studentsResponse = await getExistingStudents();

                setFormFieldsData(formFieldsDataResponse);
                setExistingStudents(studentsResponse);
            } catch (error) {
                console.log("Error :: UseEffect ::", error.message);
            }
        })();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("firstName", studentData.firstName);
            formData.append("lastName", studentData.lastName);
            formData.append("discipline", studentData.discipline);
            formData.append("year", studentData.year);
            formData.append("metricMarks", studentData.metricMarks);
            formData.append("sectionId", studentData.sectionId);
            formData.append("dateOfBirth", studentData.dateOfBirth);
            formData.append("address", studentData.address);
            formData.append("phoneNumber", studentData.phoneNumber);
            formData.append("parentsName", studentData.parentsName);
            formData.append("email", studentData.email);
            formData.append("city", studentData.city);

            if (image && cropped) {
                const blob = await fetch(image).then((res) => res.blob());
                formData.append("studentProfile", blob);
            }

            const response = await addStudentRequest(formData);
            console.log("response ::", response);
        } catch (error) {
            console.log("Error :: Add Student ::", error);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        setStudentData({ ...studentData, studentProfile: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const checkNewUpload = () => {
        if (image && cropped) {
            setImage(null);
            setCropped(false);
            setScale(1);
        }
    };

    const handleCropImage = () => {
        if (editorRef.current) {
            const canvas = editorRef.current.getImageScaledToCanvas();
            const croppedImageUrl = canvas.toDataURL();
            setImage(croppedImageUrl);
            setCropped(true);
        }
    };

    const handleDateOfBirth = (value) => {
        setDateOfBirth(value);
        const modifiedDate = value?.toLocaleDateString()?.split("/");
        setStudentData({
            ...studentData,
            dateOfBirth: `${modifiedDate[1]}-${modifiedDate[0]}-${modifiedDate[2]}`,
        });
    };

    const handleSectionValue = (value) => {
        setStudentData({ ...studentData, sectionId: value });
    };

    const handleYear = (value) => {
        setStudentData({ ...studentData, year: value });
    };

    const handleDiscipline = (value) => {
        setStudentData({ ...studentData, discipline: value });
    };

    const handleCity = (value) => {
        setStudentData({ ...studentData, city: value });
    };

    return (
        <Card className="w-[950px] mx-auto mt-5">
            <CardContent>
                <Tabs defaultValue="add-student">
                    <TabsList className="flex mt-2 mb-6">
                        <TabsTrigger value="add-student" className="w-full">
                            Add New Student
                        </TabsTrigger>
                        <TabsTrigger value="select-student" className="w-full">
                            Select Existing
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="add-student">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="flex gap-8"
                            >
                                <div className="w-1/3">
                                    <div className="flex flex-col items-center h-full space-y-2 mb-4">
                                        {image ? (
                                            <div>
                                                {!cropped ? (
                                                    <div>
                                                        <AvatarEditor
                                                            ref={editorRef}
                                                            image={image}
                                                            width={200}
                                                            height={200}
                                                            border={50}
                                                            borderRadius={100}
                                                            color={[255, 255, 255, 0.6]} // RGBA
                                                            scale={scale}
                                                            rotate={0}
                                                        />
                                                        <div className="flex flex-col gap-5">
                                                            <Input
                                                                className="h-1 mt-4"
                                                                type="range"
                                                                value={scale}
                                                                min="1"
                                                                max="2"
                                                                step="0.01"
                                                                onChange={(e) =>
                                                                    setScale(
                                                                        parseFloat(
                                                                            e.target.value
                                                                        )
                                                                    )
                                                                }
                                                            />
                                                            <Button onClick={handleCropImage}>
                                                                Crop Image
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={image}
                                                        alt="Cropped Image"
                                                        className="w-44 h-44 rounded-full"
                                                    />
                                                )}
                                            </div>
                                        ) : (
                                            <Avatar className="w-44 h-44">
                                                <AvatarImage src={image} alt="Student" />
                                                <AvatarFallback>Upload</AvatarFallback>
                                            </Avatar>
                                        )}

                                        <Label
                                            htmlFor="picture"
                                            className="cursor-pointer flex gap-4"
                                        >
                                            <Input
                                                id="picture"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleImageUpload}
                                            />
                                            <span
                                                className="font-bold border border-1 border-gray-200 shadow-sm px-3 py-2 rounded-md hover:bg-black hover:text-white hover:font-semibold"
                                                onClick={checkNewUpload}
                                            >
                                                Upload Image
                                            </span>
                                        </Label>
                                    </div>
                                </div>
                                <div className="w-2/3 grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">First Name</Label>
                                        <Input
                                            id="firstName"
                                            value={studentData.firstName}
                                            onChange={(e) =>
                                                setStudentData({
                                                    ...studentData,
                                                    firstName: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Last Name</Label>
                                        <Input
                                            id="lastName"
                                            value={studentData.lastName}
                                            onChange={(e) =>
                                                setStudentData({
                                                    ...studentData,
                                                    lastName: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="parentsName">Father/Mother Name</Label>
                                        <Input
                                            id="parentsName"
                                            value={studentData.parentsName}
                                            onChange={(e) =>
                                                setStudentData({
                                                    ...studentData,
                                                    parentsName: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={`w-full justify-start text-left font-normal ${
                                                        !dateOfBirth && "text-muted-foreground"
                                                    }`}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {dateOfBirth ? (
                                                        studentData.dateOfBirth
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent
                                                className="w-auto p-0"
                                                align="start"
                                            >
                                                <Calendar
                                                    mode="single"
                                                    selected={dateOfBirth}
                                                    onSelect={handleDateOfBirth}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={studentData.email}
                                            onChange={(e) =>
                                                setStudentData({
                                                    ...studentData,
                                                    email: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phoneNumber">Phone Number</Label>
                                        <Input
                                            id="phoneNumber"
                                            value={studentData.phoneNumber}
                                            onChange={(e) =>
                                                setStudentData({
                                                    ...studentData,
                                                    phoneNumber: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="metric-marks">Metric Marks</Label>
                                        <Input
                                            id="metric-marks"
                                            value={studentData.metricMarks}
                                            onChange={(e) =>
                                                setStudentData({
                                                    ...studentData,
                                                    metricMarks: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="section">Section</Label>
                                        <Select
                                            onValueChange={handleSectionValue}
                                            defaultValue={sectionIdToSelect}
                                            required
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Section" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {formFieldsData?.sections?.map((item) => (
                                                    <SelectItem
                                                        key={item._id}
                                                        value={item._id}
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="year">Year</Label>
                                        <Select onValueChange={handleYear} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {formFieldsData?.years?.map((item) => (
                                                    <SelectItem
                                                        key={item._id}
                                                        value={item._id}
                                                    >
                                                        {item.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="discipline">Discipline</Label>
                                        <Select onValueChange={handleDiscipline} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Discipline" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {["CS", "Eng"].map((item) => (
                                                    <SelectItem key={item} value={item}>
                                                        {item}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="address">Address</Label>
                                        <Input
                                            id="address"
                                            value={studentData.address}
                                            onChange={(e) =>
                                                setStudentData({
                                                    ...studentData,
                                                    address: e.target.value,
                                                })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Select onValueChange={handleCity} required>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select City" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {["Lahore", "Islamabad"].map((city) => (
                                                    <SelectItem
                                                        key={city}
                                                        value={city.toLowerCase()}
                                                    >
                                                        {city}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Button type="submit" className="col-span-2">
                                        Add Student
                                    </Button>
                                </div>
                            </motion.div>
                        </form>
                    </TabsContent>
                    <TabsContent value="select-student">
                        <div className="flex gap-3 items-end">
                            <div className="space-y-1">
                                <Label htmlFor="select-type">Search By</Label>
                                <Select onValueChange={setSearchQueryType}>
                                    <SelectTrigger className="w-[200px]">
                                        <SelectValue placeholder="Search By" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="roll-number">
                                            Roll Number
                                        </SelectItem>
                                        <SelectItem value="name">Name</SelectItem>
                                        <SelectItem value="email">Email</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-1 w-full">
                                <Label htmlFor="search-value">Roll Number</Label>
                                <Input
                                    id="search-value"
                                    value={searchQueryValue}
                                    onChange={(e) => setSearchQueryValue(e.target.value)}
                                    required
                                />
                            </div>
                            <Button>Search</Button>
                        </div>
                        <ScrollArea className="h-[70vh] w-full mt-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-5 mb-3"
                            >
                                {existingStudents.map((student) => (
                                    <UserCard key={student._id} {...student} />
                                ))}
                            </motion.div>
                        </ScrollArea>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};
