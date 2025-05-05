import ManageCourse from "@/components/course/manage-course";
import { getAllCourses } from "@/lib/action/course.action";
import React from "react";

const page = async () => {
  const courses = await getAllCourses();
  return (
    <div className="w-full">
      <ManageCourse data={courses ? JSON.parse(JSON.stringify(courses)) : []} />
    </div>
  );
};

export default page;
