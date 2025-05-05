import { CourseGrid, CourseItem } from "@/components/common";
import { SignOutButton } from "@/components/common/sign-out";
import Heading from "@/components/typography/heading";
import { ICourse } from "@/database/course.model";
import React from "react";

const page = () => {
  // const user = CreateUser({
  //   clerkId: "clerkId123",
  //   username: "study",
  //   email: "email123",
  // });

  // const user = CreateUser({
  //   clerkId: "fghfghf",
  //   username: "username!",
  //   name: "username!",
  //   email: "test@gmail.com",
  //   avatar: "aksjdajsdaksjdaksd",
  // });
  return (
    <>
      <Heading>Khoá học của tôi</Heading>
      <SignOutButton />

      <CourseGrid>
        <CourseItem data={{} as ICourse} />
        <CourseItem data={{} as ICourse} />
        <CourseItem data={{} as ICourse} />
      </CourseGrid>
    </>
  );
};

export default page;
