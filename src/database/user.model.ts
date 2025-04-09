import { EUserRole, EUserStatus } from "@/interfaces/user/enum";
import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  status: EUserStatus;
  role: EUserRole;
  course: Schema.Types.ObjectId[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  avatar: {
    type: String,
    default: "https://www.gravatar.com/avatar",
  },
  course: {
    type: [Schema.Types.ObjectId],
    ref: "Course",
  },
  role: {
    type: String,
    enum: Object.values(EUserRole),
    default: EUserRole.USER,
  },
  status: {
    type: String,
    enum: Object.values(EUserStatus),
    default: EUserStatus.ACTIVE,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<IUser>("User", UserSchema);
