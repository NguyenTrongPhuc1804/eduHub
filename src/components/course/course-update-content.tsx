"use client";
import React, { MouseEvent, MouseEventHandler, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ICourse } from "@/database/course.model";
import { createLecture, updateLecture } from "@/lib/action/lecture.action";
import { toast } from "sonner";
import { IGetCourseResponse } from "@/interfaces";
import AlertDialogDelete from "../common/alert-dialog";
import { useImmer } from "use-immer";

const CourseUpdateContent = ({ course }: { course: IGetCourseResponse }) => {
  const lectures = course.lectures;

  const [lectureEdit, setLectureEdit] = useState<number>(-1);
  const [lectureTitle, setLectureTitle] = useState<string>("");

  const handleAddNewLesson = async (
    e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation();
  };

  //------------------------------------------------
  const handleAddNewLecture = async () => {
    try {
      const res = await createLecture({
        title: "Chuong moi",
        course: course._id,
        order: lectures.length + 1,
        path: `/manage/course/update-content?slug=${course.slug}`,
      });

      if (!res.success) {
        throw new Error(res.message);
      }

      console.log({ res });
      toast.success(res.message);
    } catch (error) {
      console.log("Error in [handleAddNewLecture]: ", error);
      toast.error("Thêm chương thất bại");
    }
  };

  //---------------------------------------------------
  const handleDeleteLecture = async (
    e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          path: `/manage/course/update-content?slug=${course.slug}`,
          destroy: true,
        },
      });

      if (res?.success) {
        toast.success(res.message);
      } else {
        toast.error(res?.message || "Lỗi");
      }
    } catch (error) {
      console.log("Error [handleDeleteLecture]: ", error);
      toast.error("Xoá chương thất bại");
    }
  };

  // ---------------------------------------------------
  const handleUpdateLecture = async (
    e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>,
    lectureId: string
  ) => {
    e.stopPropagation();
    try {
      const res = await updateLecture({
        lectureId,
        updateData: {
          path: `/manage/course/update-content?slug=${course.slug}`,
          title: lectureTitle,
        },
      });
      setLectureEdit(-1);

      if (res?.success) {
        toast.success("Cập nhật chương thành công");
        setLectureEdit(-1);
        setLectureTitle("");
      } else {
        toast.error(res?.message || "Lỗi");
      }
    } catch (error) {
      console.log("Error [handleDeleteLecture]: ", error);
      toast.error("Xoá chương thất bại");
    }
  };

  return (
    <div className="mt-5 flex flex-col gap-2 mb-5">
      {lectures.map((item, idx) => (
        <div className="" key={item._id}>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            key={item._id}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="flex items-center w-full justify-between gap-3">
                  {idx !== lectureEdit ? (
                    <div className="text-lg font-semibold">{item.title}</div>
                  ) : (
                    <div className="w-full">
                      <Input
                        placeholder="Tên chương"
                        defaultValue={item.title}
                        onChange={(e) => setLectureTitle(e.target.value)}
                      />
                    </div>
                  )}

                  <div className="flex gap-2 pr-5">
                    {idx === lectureEdit ? (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateLecture(e, item._id);
                        }}
                        className="cursor-pointer"
                      >
                        Lưu
                      </span>
                    ) : (
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          setLectureEdit(idx);
                          setLectureTitle(item.title);
                        }}
                        className="cursor-pointer"
                      >
                        <Edit />
                      </span>
                    )}

                    <AlertDialogDelete
                      func={(e) => handleDeleteLecture(e, item._id)}
                      title="Xoá chương"
                      description="Bạn có chắc chắn muốn xoá chương này không?"
                    >
                      <span className="cursor-pointer">
                        <Trash />
                      </span>
                    </AlertDialogDelete>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>hello guy bro mem</AccordionContent>
            </AccordionItem>
          </Accordion>

          <Button
            className="w-fit block ml-auto mt-5"
            onClick={handleAddNewLecture}
          >
            Thêm bài học
          </Button>
        </div>
      ))}

      <Button className="w-fit block mr-auto" onClick={handleAddNewLecture}>
        Thêm chương mới
      </Button>
    </div>
  );
};

export default CourseUpdateContent;
