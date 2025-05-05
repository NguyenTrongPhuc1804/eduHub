import { ICourse } from "@/database/course.model";

export interface ICreateCourseParams {
  title: string;
  slug: string;
}

export interface IResponseCreateCourse {
  success: boolean;
  data: ICourse;
}

export interface IUpdateCourse {
  slug: string;
  updateData: Partial<ICourse>;
  path?: string;
}

export interface IUpdateResponse {
  success: boolean;
  data: ICourse | null;
  message: string;
}
