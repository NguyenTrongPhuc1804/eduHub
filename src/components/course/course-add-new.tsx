"use client";

import React, { useState } from "react";
import { z } from "zod";

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
import { createCourse } from "@/lib/action/course.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(10, "Tên khoá học phải có ít nhất 10 ký tự"),
  slug: z.string().optional(),
});

const CourseAddNew = () => {
  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const data = {
        title: values.title,
        slug:
          values.slug ||
          slugify(values.title, {
            lower: true,
            locale: "vi",
          }),
      };

      const res = await createCourse(data);
      if (res?.success) {
        toast.success("Tạo khoá học thành công");
        form.reset();
      }

      if (res?.data) {
        router.push(`/manage/course/update?slug=${res.data.slug}`);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }
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
                  <Input placeholder="title" {...field} />
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
                  <Input placeholder="khoa-hoc-lap-trinh" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          disabled={isLoading}
          className="dark:text-primary dark:bg-white w-[120px]"
          type="submit"
        >
          Tạo khoá học
        </Button>
      </form>
    </Form>
  );
};

export default CourseAddNew;
