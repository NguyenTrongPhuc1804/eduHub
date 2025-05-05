import { ECourseLevel, ECourseStatus } from "@/interfaces/course/enum";
import { Document, model, models, Schema } from "mongoose";

export interface ICourse extends Document {
  _id: string;
  title: string;
  image: string;
  intro_url: string;
  description: string;
  price: number;
  sale_price: number;
  slug: string;
  status: ECourseStatus;
  level: ECourseLevel;
  author: Schema.Types.ObjectId;
  views: number;
  rating: number[];
  info: {
    requirements: string[];
    benefits: string[];
    qa: [
      {
        question: string;
        answer: string;
      }
    ];
  };
  order: number;
  lectures: Schema.Types.ObjectId[];
  _destroy: boolean;
  created_at: Date;
}

const CourseSchema = new Schema<ICourse>({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default: "",
  },
  intro_url: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  sale_price: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  order: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: Object.values(ECourseStatus),
    default: ECourseStatus.PENDING,
  },
  level: {
    type: String,
    enum: Object.values(ECourseLevel),
    default: ECourseLevel.BEGINNER,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  lectures: {
    type: [Schema.Types.ObjectId],
    ref: "Lecture",
  },
  rating: {
    type: [Number],
    default: [5],
  },
  views: {
    type: Number,
    default: 0,
  },
  info: {
    requirements: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    qa: [
      {
        question: {
          type: String,
          default: "",
        },
        answer: {
          type: String,
          default: "",
        },
      },
    ],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  _destroy: {
    type: Boolean,
    default: false,
  },
});

export const Course = models.Course || model("Course", CourseSchema);
