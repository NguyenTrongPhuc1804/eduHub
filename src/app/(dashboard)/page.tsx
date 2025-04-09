import CourseGrid from "@/components/common/course-grid";
import CourseItem from "@/components/common/course-item";
import Heading from "@/components/typography/heading";
import CreateUser from "@/lib/action/user.action";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  return (
    <div>
      <Heading>Kham pha</Heading>
      <div className="text-black">
        <SignInButton />
        <SignUpButton />
      </div>
      <CourseGrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </div>
  );
};

export default Page;
