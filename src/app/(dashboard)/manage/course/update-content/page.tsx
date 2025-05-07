import { Params, SearchParams } from "@/interfaces/common/common.interface";
import { getCourseBySlug } from "@/lib/action/course.action";

const page = async (props: { params: Params; searchParams: SearchParams }) => {
  const params = await props.params;
  const slug = params.slug;

  const findCourse = await getCourseBySlug({ slug: slug });
  console.log({ slug });
  return (
    <>
      {/* <Heading className="">Cập nhật khoá học</Heading>
      {findCourse && <CourseUpdate data={findCourse} />} */}
      <h1>hello</h1>
    </>
  );
};

export default page;
