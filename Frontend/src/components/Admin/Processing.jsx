import { Loader2 } from "lucide-react";

const Processing = () => {
  return (
    <span className="absolute h-[98%] w-full z-20 flex items-center justify-center bg-white bg-opacity-60 backdrop-blur-sm rounded-lg">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </span>
  );
};

export default Processing;
