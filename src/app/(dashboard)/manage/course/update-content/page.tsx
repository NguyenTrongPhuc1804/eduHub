import PageNotFound from "@/app/not-found";
import CourseUpdateContent from "@/components/course/course-update-content";
import Heading from "@/components/typography/heading";
import { Params } from "@/interfaces/common/common.interface";
import { getCourseBySlug } from "@/lib/action/course.action";
import { SearchParams } from "next/dist/server/request/search-params";

const page = async (props: { params: Params; searchParams: SearchParams }) => {
  const params = await props.searchParams;
  const slug = params.slug;
  const findCourse = await getCourseBySlug({ slug: slug });

  if (!findCourse) return <PageNotFound />;
  return (
    <>
      <Heading className="">
        Nội dung khoá học:{" "}
        <strong className="text-second">{findCourse.title}</strong>
      </Heading>
      <CourseUpdateContent course={JSON.parse(JSON.stringify(findCourse))} />
    </>
  );
};

export default page;
