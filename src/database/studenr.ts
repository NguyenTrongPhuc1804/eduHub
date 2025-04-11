import mongoose, { Document, Schema } from "mongoose";

export interface IStudent extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  enrolledCourses: Schema.Types.ObjectId[];
  created_at: Date;
}

const StudentSchema = new Schema<IStudent>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  enrolledCourses: {
    type: [Schema.Types.ObjectId],
    ref: "Course",
    default: [],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema);
