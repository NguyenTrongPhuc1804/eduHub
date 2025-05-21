import { ICourse } from "@/database/course.model";
import { ILecture } from "@/database/lecture.model";

export interface IGetCourseResponse extends Omit<ICourse, "lectures"> {
  lectures: ILecture[];
}
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
