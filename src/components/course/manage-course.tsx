"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Heading from "../typography/heading";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { courseStatusOptions } from "@/constants";
import { Button } from "../ui/button";
import { BookOpen, Edit, Eye, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { ICourse } from "@/database/course.model";
import { updateCourse } from "@/lib/action/course.action";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ECourseStatus } from "@/interfaces/course/enum";
import { Input } from "../ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter } from "next/navigation";

const ManageCourse = ({ data }: { data: ICourse[] }) => {
  const route = useRouter();
  const defaultImage = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL;

  const handleDeleteCourse = async (slug: string) => {
    const res = await updateCourse({
      slug,
      updateData: {
        status: ECourseStatus.PENDING,
        _destroy: true,
      },
      path: "/manage/course",
    });

    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error(res?.message || "Lỗi");
    }
  };

  const handleUpdateCourseStatus = async (
    slug: string,
    status: ECourseStatus
  ) => {
    const res = await updateCourse({
      slug,
      updateData: {
        status:
          status === ECourseStatus.PENDING
            ? ECourseStatus.APPROVED
            : ECourseStatus.PENDING,
        _destroy: false,
      },
      path: "/manage/course",
    });

    if (res?.success) {
      toast.success(res.message);
    } else {
      toast.error(res?.message || "Lỗi");
    }
  };

  return (
    <div>
      <Heading className="mb-5 lg:mb-0">Quản lý khoá học</Heading>
      <Input className="my-5" placeholder="Tìm kiếm khoá học..." />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-full">Thông tin</TableHead>
            <TableHead>Giá khoá học</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item._id}>
              <TableCell className="font-medium">
                <div className="lg:flex flex-row  items-center   gap-3 w-full">
                  <Image
                    src={item.image || defaultImage!}
                    alt="Course"
                    width={80}
                    height={80}
                    className="flex-shrink-0 size-20 rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-1 text-start">
                    <div className="text-base font-medium">{item.title}</div>
                    <p className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-bold">
                <p className="text-base">{item.price.toLocaleString()} đ</p>
              </TableCell>
              <TableCell className="font-bold">
                <Badge
                  variant="default"
                  className={`${
                    courseStatusOptions[item.status].className
                  } rounded-sm cursor-pointer`}
                  onClick={() => {
                    handleUpdateCourseStatus(item.slug, item.status);
                  }}
                >
                  {courseStatusOptions[item.status].title}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="grid grid-cols-4 gap-2 w-[200px]">
                  <Link
                    href={`/courses/update-content?slug=${item.slug}`}
                    target="_blank"
                  >
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      size="icon"
                    >
                      <BookOpen />
                    </Button>
                  </Link>
                  <Link href={`/course/${item.slug}`} target="_blank">
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      size="icon"
                    >
                      <Eye />
                    </Button>
                  </Link>
                  <Link href={`/manage/course/update?slug=${item.slug}`}>
                    <Button
                      className="cursor-pointer"
                      variant="outline"
                      size="icon"
                    >
                      <Edit />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="cursor-pointer"
                        variant="outline"
                        size="icon"
                      >
                        <Trash />
                      </Button>
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Bạn có chắc chắn muốn xóa khoá học này?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Điều này sẽ xóa khoá học khỏi hệ thống và không thể
                          khôi phục lại.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="cursor-pointer">
                          Huỷ
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-second text-white cursor-pointer"
                          onClick={() => handleDeleteCourse(item.slug)}
                        >
                          Tiếp tục
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  {/* <Button
                    onClick={() => handleDeleteCourse(item.slug)}
                    variant="outline"
                    size="icon"
                  >
                    <Trash />
                  </Button> */}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <Button
        onClick={() => route.push("/manage/course/new")}
        variant={"default"}
        className="text-white size-10 animate-bounce bg-second rounded-full fixed bottom-5 right-5"
      >
        <Plus />
      </Button>
      <div className="">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default ManageCourse;
