import { toast } from "@/hooks/use-toast";

const useCustomToast = () => {
    const showToast = (title, description, action) => {
        toast({
            title,
            description,
            action,
        });
    };

    return { showToast };
};

export default useCustomToast;
