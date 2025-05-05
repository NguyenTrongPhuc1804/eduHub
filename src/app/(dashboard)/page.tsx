import CourseGrid from "@/components/common/course-grid";
import CourseItem from "@/components/course/course-item";
import Heading from "@/components/typography/heading";
import { getAllCourses } from "@/lib/action/course.action";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import React from "react";

const Page = async () => {
  const courses = await getAllCourses();
  return (
    <div>
      <Heading>Kham pha</Heading>
      <div className="text-black">
        <SignInButton />
        <SignUpButton />
      </div>
      <CourseGrid>
        {courses?.map((course) => (
          <CourseItem key={course.slug} data={course} />
        ))}
      </CourseGrid>
    </div>
  );
};

export default Page;
