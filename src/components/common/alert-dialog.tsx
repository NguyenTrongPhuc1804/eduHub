import React from "react";
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

interface IAlertDialogDelete {
  children: React.ReactNode;
  title: string;
  description: string;
  func: (
    e: React.MouseEvent<HTMLSpanElement, globalThis.MouseEvent>
  ) => Promise<void>;
}

const AlertDialogDelete = ({
  children,
  title,
  description,
  func,
}: IAlertDialogDelete) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">Huỷ</AlertDialogCancel>
          <AlertDialogAction
            className="bg-second text-white cursor-pointer"
            onClick={func}
          >
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogDelete;
