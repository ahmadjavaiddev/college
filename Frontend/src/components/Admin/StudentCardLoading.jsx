import React from "react";
import { Card, Skeleton } from "@/components/ui/index";

const StudentCardLoading = (key) => {
  return (
    <Card key={key} className="py-4 px-4">
      <div className="flex items-center space-x-4 mb-8">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[180px]" />
          <Skeleton className="h-4 w-[130px]" />
        </div>
      </div>
      {[1, 2].map((item) => (
        <div key={item} className="mb-3">
          <div className="flex justify-between mb-2">
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[80px]" />
          </div>
        </div>
      ))}
      <Skeleton className="mt-2 h-7 w-full" />
    </Card>
  );
};

export default StudentCardLoading;
