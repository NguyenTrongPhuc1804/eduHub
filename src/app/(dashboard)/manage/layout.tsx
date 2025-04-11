import { GetUserByClerkId } from "@/lib/action/user.action";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const { userId } = await auth();

  if (!userId) return redirect("/sign-in");

  const user = await GetUserByClerkId(userId);
  console.log({ user, userId });
  return <div>{children}</div>;
};

export default AdminLayout;
