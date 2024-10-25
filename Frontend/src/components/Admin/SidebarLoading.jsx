import { Skeleton } from "@/components/ui/skeleton";

const SidebarLoading = () => {
    return (
        <>
            <div className="flex justify-between space-x-4 mb-3">
                <Skeleton className="h-4 w-[130px]" />
                <Skeleton className="h-4 w-[70px]" />
            </div>
            <div className="flex justify-between space-x-4 mb-3">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[70px]" />
            </div>
            <div className="flex justify-between space-x-4 mb-3">
                <Skeleton className="h-4 w-[130px]" />
                <Skeleton className="h-4 w-[70px]" />
            </div>
            <div className="flex justify-between space-x-4 mb-3">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-4 w-[70px]" />
            </div>
            <div className="flex justify-between space-x-4 mb-3">
                <Skeleton className="h-4 w-[130px]" />
                <Skeleton className="h-4 w-[70px]" />
            </div>
        </>
    );
};

export default SidebarLoading;
