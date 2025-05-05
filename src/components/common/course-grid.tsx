import React from "react";

const CourseGrid = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mt-8">
      {children}
    </div>
  );
};

export default CourseGrid;
