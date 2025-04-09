import {
  IconComment,
  IconExplore,
  IconOrder,
  IconPlay,
  IconUser,
} from "@/components/icons";
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
