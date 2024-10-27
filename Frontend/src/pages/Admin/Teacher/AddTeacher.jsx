import { useState, useRef } from "react";
import {
  Input,
  Label,
  Button,
  Card,
  CardContent,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Calendar,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/index";
import { CalendarIcon } from "lucide-react";
import AvatarEditor from "react-avatar-editor";
import { motion } from "framer-motion";
import { addTeacherRequest } from "../../../api";

export const AddTeacher = () => {
  const [teacherData, setTeacherData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    dateOfBirth: "",
    discipline: "",
    address: "",
    city: "",
    teacherProfile: "",
  });

  const [image, setImage] = useState(null);
  const [scale, setScale] = useState(1);
  const editorRef = useRef(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [cropped, setCropped] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", teacherData.firstName);
      formData.append("lastName", teacherData.lastName);
      formData.append("email", teacherData.email);
      formData.append("phoneNumber", teacherData.phoneNumber);
      formData.append("dateOfBirth", teacherData.dateOfBirth);
      formData.append("discipline", teacherData.discipline);
      formData.append("address", teacherData.address);
      formData.append("city", teacherData.city);
      formData.append("subject", teacherData.subject);

      if (image && cropped) {
        const blob = await fetch(image).then((res) => res.blob());
        formData.append("teacherProfile", blob);
      }

      const response = await addTeacherRequest(formData);
      console.log("response ::", response);
    } catch (error) {
      console.log("Error :: Add Teacher ::", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setTeacherData({ ...teacherData, teacherProfile: file });
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
    if (value) {
      const modifiedDate = value.toLocaleDateString().split("/");
      setTeacherData({
        ...teacherData,
        dateOfBirth: `${modifiedDate[1]}-${modifiedDate[0]}-${modifiedDate[2]}`,
      });
    }
  };

  const handleDiscipline = (value) => {
    setTeacherData({ ...teacherData, discipline: value });
  };

  const handleCity = (value) => {
    setTeacherData({ ...teacherData, city: value });
  };

  return (
    <Card className="w-[950px] mx-auto mt-5 pt-5">
      <CardContent>
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
                              setScale(parseFloat(e.target.value))
                            }
                          />
                          <Button onClick={handleCropImage}>Crop Image</Button>
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

                <Label htmlFor="picture" className="cursor-pointer flex gap-4">
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
                  value={teacherData.firstName}
                  onChange={(e) =>
                    setTeacherData({
                      ...teacherData,
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
                  value={teacherData.lastName}
                  onChange={(e) =>
                    setTeacherData({
                      ...teacherData,
                      lastName: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={teacherData.email}
                  onChange={(e) =>
                    setTeacherData({
                      ...teacherData,
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
                  value={teacherData.phoneNumber}
                  onChange={(e) =>
                    setTeacherData({
                      ...teacherData,
                      phoneNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={teacherData.subject}
                  onChange={(e) =>
                    setTeacherData({
                      ...teacherData,
                      subject: e.target.value,
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
                        dateOfBirth.toLocaleDateString()
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
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
                  value={teacherData.address}
                  onChange={(e) =>
                    setTeacherData({
                      ...teacherData,
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
                      <SelectItem key={city} value={city.toLowerCase()}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="col-span-2">
                Add Teacher
              </Button>
            </div>
          </motion.div>
        </form>
      </CardContent>
    </Card>
  );
};
