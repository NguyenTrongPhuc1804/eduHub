import PageNotFound from "@/app/not-found";
import { EUserRole } from "@/interfaces/user/enum";
import { GetUserByClerkId } from "@/lib/action/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const user = await GetUserByClerkId(userId);
  if (user && user.role !== EUserRole.ADMIN) return <PageNotFound />;
  return <>{children}</>;
};

export default AdminLayout;
