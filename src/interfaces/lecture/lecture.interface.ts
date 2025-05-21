export interface ICreateLectureParams {
  course: string;
  title?: string;
  order?: number;
  path?: string;
}

export interface TUpdateLectureParams {
  lectureId: string;
  updateData: {
    title?: string;
    order?: number;
    destroy?: boolean;
    path?: string;
  };
}
