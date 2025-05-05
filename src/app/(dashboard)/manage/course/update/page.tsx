import PageNotFound from "@/app/not-found";
import CourseUpdate from "@/components/course/course-update";
import Heading from "@/components/typography/heading";
import { SearchParams } from "@/interfaces/common/common.interface";
import { getCourseBySlug } from "@/lib/action/course.action";
import React from "react";

const Page = async (props: { searchParams: SearchParams }) => {
  const params = await props.searchParams;

  const findCourse = await getCourseBySlug({ slug: params.slug as string });

  return (
    <div>
      <Heading className="">Cập nhật khoá học</Heading>
      {findCourse ? <CourseUpdate data={findCourse} /> : <PageNotFound />}
    </div>
  );
};

export default Page;
