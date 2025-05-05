"use server";

import {
  ICreateCourseParams,
  IResponseCreateCourse,
  IUpdateCourse,
  IUpdateResponse,
} from "@/interfaces/course/course.interface";
import { connectToDB } from "../mongoose";
import { Course, ICourse } from "@/database/course.model";
import { revalidatePath } from "next/cache";

export const createCourse = async (
  params: ICreateCourseParams
): Promise<IResponseCreateCourse | undefined> => {
  connectToDB();

  try {
    const course = await Course.create(params);
    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
    };
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------
export const getCourseBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<ICourse | undefined> => {
  connectToDB();

  try {
    const course = await Course.findOne({ slug });
    return JSON.parse(JSON.stringify(course));
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------
export const getAllCourses = async (): Promise<ICourse[] | undefined> => {
  connectToDB();

  try {
    const courses = await Course.find({});
    return courses;
  } catch (error) {
    console.log(error);
  }
};

//----------------------------------------------
export const updateCourse = async (
  params: IUpdateCourse
): Promise<IUpdateResponse | undefined> => {
  connectToDB();

  try {
    const findCourse = await Course.findOne({ slug: params.slug });
    if (!findCourse) {
      return {
        success: false,
        data: null,
        message: "Không tìm thấy khoá học",
      };
    }
    const course = await Course.findOneAndUpdate(
      { slug: params.slug },
      params.updateData,
      {
        new: true,
      }
    );

    revalidatePath(params.path || "/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(course)),
      message: "Cập nhật khoá học thành công",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      data: null,
      message: "Update course failed",
    };
  }
};

//----------------------------------------------
export const deleteCourse = async (slug: string) => {
  connectToDB();

  try {
    const findCourse = await Course.findOne({ slug });
    if (!findCourse) {
      return {
        success: false,
        message: "Không tìm thấy khoá học",
      };
    }
    await Course.findOneAndDelete({ slug });
    revalidatePath(`/`);
    return {
      success: true,
      message: "Xóa khoá học thành công",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Xóa khoá học thất bại",
    };
  }
};
