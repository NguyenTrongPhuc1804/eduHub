"use client";

import React, { useState } from "react";
import { z } from "zod";
import "@uploadthing/react/styles.css";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { updateCourse } from "@/lib/action/course.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ICourse } from "@/database/course.model";
import { ECourseLevel, ECourseStatus } from "@/interfaces/course/enum";
import { Textarea } from "../ui/textarea";
import { useImmer } from "use-immer";
import { IconAdd } from "../icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { courseLevel, courseStatus } from "@/constants";
import { UploadButton } from "@/utils/uploadthing";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

const formSchema = z.object({
  title: z.string().min(10, "Tên khoá học phải có ít nhất 10 ký tự"),
  slug: z.string().optional(),
  sale_price: z
    .number()
    .int("Giá khuyến mãi phải là số nguyên")
    .nonnegative({ message: "Giá khuyến mãi không được âm" })
    .optional(),
  price: z
    .number()
    .int("Giá gốc phải là số nguyên")
    .positive({ message: "Giá gốc phải lớn hơn 0" })
    .optional(),
  image: z.string().optional(),
  intro_url: z.string().optional(),
  description: z.string().optional(),
  status: z
    .enum([
      ECourseStatus.PENDING,
      ECourseStatus.APPROVED,
      ECourseStatus.REJECTED,
    ])
    .optional(),
  level: z
    .enum([
      ECourseLevel.BEGINNER,
      ECourseLevel.INTERMEDIATE,
      ECourseLevel.ADVANCED,
    ])
    .optional(),
  views: z.number().int().nonnegative().optional(),
  info: z.object({
    requirements: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    qa: z
      .array(
        z.object({
          question: z.string().optional(),
          answer: z.string().optional(),
        })
      )
      .optional(),
  }),
});

const CourseUpdate = ({ data }: { data: ICourse }) => {
  const router = useRouter();

  const [courseInfo, setCourseInfo] = useImmer({
    requirements: data.info.requirements,
    benefits: data.info.benefits,
    qa: data.info.qa,
  });

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title,
      slug: data?.slug,
      sale_price: data?.sale_price,
      price: data?.price,
      image: data?.image,
      intro_url: data?.image,
      description: data?.description,
      status: data.status,
      level: data.level,
      views: data.views,
      info: {
        requirements: data?.info?.requirements,
        benefits: data?.info?.benefits,
        qa: data?.info?.qa,
      },
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const payload = {
        slug: data.slug,
        updateData: {
          title: values.title,
          slug: slugify(values.slug ?? ""),
          sale_price: values.sale_price,
          price: values.price,
          image: values.image,
          intro_url: values.intro_url,
          description: values.description,
          status: values.status,
          level: values.level,
          views: values.views,
          info: {
            requirements: courseInfo.requirements,
            benefits: courseInfo.benefits,
            qa: courseInfo.qa,
          },
        },
      };

      const res = await updateCourse(payload);
      if (res?.success) {
        toast.success("Cập nhất khoá học thành công");
        if (data.slug !== values.slug) {
          router.replace(`/manage/course/update?slug=${values.slug}`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật khoá học thất bại");
    } finally {
      setIsLoading(false);
    }
  }

  const imageWatcher = form.watch("image");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-8 mt-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên khoá học</FormLabel>
                <FormControl>
                  <Input className="bg-white" placeholder="title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Đường dẫn</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="khoa-hoc-lap-trinh"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="sale_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá khuyến mãi</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá gốc</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="number"
                    placeholder="0"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả khoá học</FormLabel>
                <FormControl>
                  <Textarea
                    className="bg-white h-[200px]"
                    placeholder="Mô tả khoá học"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({}) => (
              <FormItem>
                <FormLabel>Ảnh đại diện</FormLabel>
                <FormControl>
                  {imageWatcher ? (
                    <Image
                      className="w-full h-[200px] object-cover rounded-md"
                      src={imageWatcher}
                      alt="image"
                      width={200}
                      height={200}
                      unoptimized
                      priority
                    ></Image>
                  ) : (
                    <UploadButton
                      config={{
                        cn: twMerge,
                      }}
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        // console.log("Files: ", res[0].ufsUrl);
                        form.setValue("image", res[0].ufsUrl);
                        alert("Upload Completed");
                      }}
                      onUploadError={(error: Error) => {
                        // Do something with the error.
                        alert(`ERROR! ${error.message}`);
                      }}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="intro_url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video giới thiệu</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    placeholder="https://..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="views"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lượt xem</FormLabel>
                <FormControl>
                  <Input
                    className="bg-white"
                    type="number"
                    placeholder="0"
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="info.requirements"
            render={({}) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Yêu cầu</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.requirements.push("");
                      });
                    }}
                    className="bg-second/0 text-second dark:text-white cursor-pointer"
                  >
                    <IconAdd className="size-6" />
                  </button>
                </FormLabel>
                <FormControl>
                  <div>
                    {courseInfo.requirements.map((item, index) => (
                      <Input
                        key={index}
                        className="bg-white mb-2"
                        placeholder={`Yêu cầu số ${index + 1} `}
                        value={item}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.requirements[index] = e.target.value;
                          });
                        }}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="info.benefits"
            render={({}) => (
              <FormItem>
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Lợi ích</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.benefits.push("");
                      });
                    }}
                    className="bg-second/0 text-second dark:text-white cursor-pointer"
                  >
                    <IconAdd className="size-6" />
                  </button>
                </FormLabel>
                <FormControl>
                  <div>
                    {courseInfo.benefits.map((item, index) => (
                      <Input
                        key={index}
                        className="bg-white mb-2"
                        placeholder={`Lợi ích số ${index + 1} `}
                        value={item}
                        onChange={(e) => {
                          setCourseInfo((draft) => {
                            draft.benefits[index] = e.target.value;
                          });
                        }}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="info.qa"
            render={({}) => (
              <FormItem className="col-start-1 col-end-3">
                <FormLabel className="flex items-center justify-between gap-5">
                  <span>Q.A</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCourseInfo((draft) => {
                        draft.qa.push({
                          question: "",
                          answer: "",
                        });
                      });
                    }}
                    className="bg-second/0 text-second dark:text-white cursor-pointer"
                  >
                    <IconAdd className="size-6" />
                  </button>
                </FormLabel>
                <FormControl>
                  <div>
                    {courseInfo.qa.map((item, index) => (
                      <div className="grid grid-cols-2 gap-5 mb-5" key={index}>
                        <Textarea
                          className="bg-white mb-2"
                          placeholder={`Câu hỏi số ${index + 1} `}
                          value={item.question}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.qa[index].question = e.target.value;
                            });
                          }}
                        />

                        <Textarea
                          className="bg-white mb-2"
                          placeholder={`Câu trả lời số ${index + 1} `}
                          value={item.answer}
                          onChange={(e) => {
                            setCourseInfo((draft) => {
                              draft.qa[index].answer = e.target.value;
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trình độ</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Trình độ" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseLevel.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trạng thái</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full bg-white">
                      <SelectValue placeholder="Trạng thái" />
                    </SelectTrigger>
                    <SelectContent>
                      {courseStatus.map((item, index) => (
                        <SelectItem key={index} value={item.value}>
                          {item.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isLoading}
          className="dark:text-primary dark:bg-white w-[140px] bg-second"
          type="submit"
        >
          Cập nhật khoá học
        </Button>
      </form>
    </Form>
  );
};

export default CourseUpdate;
