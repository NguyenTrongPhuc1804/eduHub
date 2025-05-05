import CourseAddNew from "@/components/course/course-add-new";
import Heading from "@/components/typography/heading";
import React from "react";

const page = () => {
  return (
    <div>
      <Heading>Tạo khoá học mới</Heading>
      <CourseAddNew />
    </div>
  );
};

export default page;
