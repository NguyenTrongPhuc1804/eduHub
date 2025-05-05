import { IconPlay } from "@/components/icons";
import IconCheck from "@/components/icons/icon-check";
import { Button } from "@/components/ui/button";
import { getCourseBySlug } from "@/lib/action/course.action";
import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courseLevelOptions, courseStatus } from "@/constants";
import { ECourseStatus } from "@/interfaces/course/enum";
import PageNotFound from "@/app/not-found";
import { Params } from "@/interfaces/common/common.interface";

const CourseDetail = async (props: { params: Params }) => {
  const params = await props.params;

  const data = await getCourseBySlug({ slug: params.slug });

  if (!data || data.status !== ECourseStatus.APPROVED) return <PageNotFound />;

  const videoId = data.intro_url?.split("v=")[1];
  return (
    <div className="grid lg:grid-cols-[2fr_1fr] grid-cols-1 gap-10 min-h-screen">
      <div className="">
        <div className="relative aspect-video mb-5">
          {data.intro_url ? (
            <iframe
              width="935"
              height="526"
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Bruno Mars -  Talking To The Moon (Lyrics) 🎵"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="w-full h-full object-fill"
            ></iframe>
          ) : (
            <Image
              src={data.image}
              alt="primary_image"
              fill
              className="w-full h-full object-cover rounded-lg"
            />
          )}
        </div>
        <h1 className="text-3xl mb-5 font-bold">{data.title}</h1>
        <BoxSection title="Mô tả">
          <div className="leading-normal mb-10">{data.description}</div>
        </BoxSection>
        <BoxSection title="Thông tin khoá học">
          <div className="grid grid-cols-4 gap-5 mb-5">
            <BoxInfo title="Bài học">100</BoxInfo>

            <BoxInfo title="Lượt xem">{data.views}</BoxInfo>

            <BoxInfo title="Trình độ">{courseLevelOptions[data.level]}</BoxInfo>

            <BoxInfo title="Thời lượng">100</BoxInfo>
          </div>
        </BoxSection>

        <BoxSection title="Yêu cầu">
          <div className="leading-normal mb-10">
            {data.info.requirements?.map((item, index) => (
              <div className="flex items-center" key={index}>
                <span className="">
                  <IconCheck className="text-white size-5 mr-2 p-1 bg-second rounded-sm " />
                </span>
                {item}
              </div>
            ))}
          </div>
        </BoxSection>

        <BoxSection title="Lợi ích">
          <div className="leading-normal mb-10">
            {data.info.benefits?.map((item, index) => (
              <div className="flex items-center" key={index}>
                <span className="">
                  <IconCheck className="text-white size-5 mr-2 p-1 bg-second rounded-sm " />
                </span>
                {item}
              </div>
            ))}
          </div>
        </BoxSection>

        <BoxSection title="Trạng thái">
          <div className="leading-normal mb-10">
            <div className="flex items-center">
              <span className="">
                <IconCheck className="text-white size-5 mr-2 p-1 bg-second rounded-sm " />
              </span>
              {courseStatus.find((item) => item.value === data.status)?.title}
            </div>
          </div>
        </BoxSection>

        <BoxSection title="Q.A">
          <div className="leading-normal mb-10">
            {data.info.qa?.map((item, index) => (
              <div className="flex items-center" key={index}>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            ))}
          </div>
        </BoxSection>
      </div>
      <div className=" bg-white dark:bg-gray-200 rounded-lg p-5 h-fit">
        <div className="flex items-center gap-2 mb-5">
          <strong className="text-second text-xl font-bold">
            {data.sale_price}
          </strong>
          <span className="text-slate-400 line-through">{data.price}</span>
          <span className="ml-auto inline-block px-3 py-1 rounded-lg bg-second/20 font-semibold text-sm text-second">
            {Math.floor((data.sale_price / data.price) * 100)}%
          </span>
        </div>

        <h3 className="font-black mb-3 text-sm dark:text-primary">
          Khoá học gồm có
        </h3>

        <ul className="mb-3 flex flex-col gap-2 text-slate-500 ">
          <li className="flex items-center gap-2 ">
            <IconPlay className="size-4" />
            <span>30h học</span>
          </li>

          <li className="flex items-center gap-2 ">
            <IconPlay className="size-4" />
            <span>Video Full HD</span>
          </li>

          <li className="flex items-center gap-2 ">
            <IconPlay className="size-4" />
            <span>Tài liệu kèm theo</span>
          </li>
        </ul>

        <Button
          variant="default"
          className="w-full h-12 bg-second dark:text-white"
        >
          Mua khoá học
        </Button>
      </div>
    </div>
  );
};

const BoxSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="mb-10">{children}</div>
    </>
  );
};

const BoxInfo = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="bg-white dark:bg-dark-2 shadow-lg dark:border border-gray-600  rounded-lg p-5 ">
      <h4 className="text-sm font-normal text-slate-400 ">{title}</h4>
      <h3 className="font-bold ">{children}</h3>
    </div>
  );
};

export default CourseDetail;
