import { Params, SearchParams } from "@/interfaces/common/common.interface";
import { getCourseBySlug } from "@/lib/action/course.action";

const page = async (props: { params: Params; searchParams: SearchParams }) => {
  const params = await props.params;
  const slug = params.slug;

  const findCourse = await getCourseBySlug({ slug: slug });
  console.log({ findCourse });
  return (
    <>
      {/* <Heading className="">Cập nhật khoá học</Heading>
      {findCourse && <CourseUpdate data={findCourse} />} */}
    </>
  );
};

export default page;
