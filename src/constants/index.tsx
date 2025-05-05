import {
  IconComment,
  IconExplore,
  IconOrder,
  IconPlay,
  IconUser,
} from "@/components/icons";
import { ECourseLevel, ECourseStatus } from "@/interfaces/course/enum";
import { MenuItem } from "@/interfaces/layout/side-bar.interface";

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Khám phá",
    href: "/",
    icon: <IconExplore className="size-5 " />,
  },
  {
    label: "Khu vực học tập",
    href: "/study",
    icon: <IconPlay className="size-5 " />,
  },
  {
    label: "Quản lý khóa học",
    href: "/manage/course",
    icon: <IconPlay className="size-5 " />,
  },
  {
    label: "Quản lý thành viên",
    href: "/manage/member",
    icon: <IconUser className="size-5 " />,
  },
  {
    label: "Quản lý đơn hàng",
    href: "/manage/order",
    icon: <IconOrder className="size-5 " />,
  },
  {
    label: "Quản lý bình luận",
    href: "/manage/comment",
    icon: <IconComment className="size-5 " />,
  },
];

export const courseStatus: { title: string; value: ECourseStatus }[] = [
  {
    title: "Đã duyệt",
    value: ECourseStatus.APPROVED,
  },
  {
    title: "Chờ duyệt",
    value: ECourseStatus.PENDING,
  },
  {
    title: "Đã từ chối",
    value: ECourseStatus.REJECTED,
  },
];

export const courseLevel: {
  title: string;
  value: ECourseLevel;
}[] = [
  {
    title: "Dễ",
    value: ECourseLevel.BEGINNER,
  },
  {
    title: "Trung bình",
    value: ECourseLevel.INTERMEDIATE,
  },
  {
    title: "Khó",
    value: ECourseLevel.ADVANCED,
  },
];

export const courseLevelOptions: Record<ECourseLevel, string> = {
  [ECourseLevel.BEGINNER]: "Dễ",
  [ECourseLevel.INTERMEDIATE]: "Trung bình",
  [ECourseLevel.ADVANCED]: "Khó",
};

export const courseStatusOptions: Record<
  ECourseStatus,
  { title: string; className: string }
> = {
  [ECourseStatus.APPROVED]: {
    title: "Đã duyệt",
    className: "text-green-500 bg-green-500/10 border-green-500",
  },
  [ECourseStatus.PENDING]: {
    title: "Chờ duyệt",
    className: "text-yellow-500 bg-yellow-500/10 border-yellow-500",
  },
  [ECourseStatus.REJECTED]: {
    title: "Đã từ chối",
    className: "text-red-500 bg-red-500/10 border-red-500",
  },
};
