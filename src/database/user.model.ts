import { EUserRole, EUserStatus } from "@/interfaces/user/enum";
import { Document, model, models, Schema } from "mongoose";

export interface IUser extends Document {
  clerk_id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  status: EUserStatus;
  role: EUserRole;
  course: Schema.Types.ObjectId[];
  created_at: Date;
}

const UserSchema = new Schema<IUser>({
  clerk_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
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
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const User = models.User || model<IUser>("User", UserSchema);
