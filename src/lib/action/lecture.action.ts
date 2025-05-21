"use server";
import { Course } from "@/database/course.model";
import { connectToDB } from "../mongoose";
import {
  createErrorResponse,
  createSuccessResponse,
  ResponseType,
} from "@/helper/response-helper";
import { ICreateLectureParams, TUpdateLectureParams } from "@/interfaces";
import { Lecture } from "@/database/lecture.model";
import { revalidatePath } from "next/cache";

export const createLecture = async (
  params: ICreateLectureParams
): Promise<ResponseType> => {
  connectToDB();
  try {
    const findCourse = await Course.findById(params.course);
    if (!findCourse) {
      return createErrorResponse({
        message: "Không tìm thấy khoá học",
      });
    }

    const newLecture = await Lecture.create(params);
    findCourse.lectures.push(newLecture._id);
    findCourse.save();

    revalidatePath(params.path || "/");
    return createSuccessResponse({
      message: "Thêm chương thành công",
    });
  } catch (error) {
    console.log("error [createLecture]: ", error);
    return createErrorResponse({
      message: "Xảy ra lỗi khi thêm chương",
    });
  }
};

export const updateLecture = async (params: TUpdateLectureParams) => {
  connectToDB();
  try {
    const { lectureId, updateData } = params;

    const findLecture = await Lecture.findByIdAndUpdate(lectureId, updateData, {
      new: true,
    });

    if (!findLecture) {
      return createErrorResponse({
        message: "Không tìm thấy chương",
      });
    }

    revalidatePath(updateData.path || "/");

    return createSuccessResponse({
      message: "Xoá chương thành công",
      data: JSON.parse(JSON.stringify(findLecture)),
    });
  } catch (error) {
    console.log("Error [updateLecture]: ", error);
  }
};
