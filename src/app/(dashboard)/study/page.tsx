import { CourseGrid, CourseItem } from "@/components/common";
import { SignOutButton } from "@/components/common/sign-out";
import Heading from "@/components/typography/heading";
import React from "react";

const page = () => {
  return (
    <>
      <Heading>Khoá học của tôi</Heading>
      <SignOutButton />

      <CourseGrid>
        <CourseItem />
        <CourseItem />
        <CourseItem />
      </CourseGrid>
    </>
  );
};

export default page;
