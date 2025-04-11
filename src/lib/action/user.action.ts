"use server";

import { IUser, User } from "@/database/user.model";
import { connectToDB } from "../mongoose";
import { ICreateUserParams } from "@/interfaces/user/user.interface";

export async function CreateUser(
  params: ICreateUserParams
): Promise<ICreateUserParams | undefined> {
  try {
    connectToDB();
    const newUser: ICreateUserParams = await User.create(params);
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function GetUserByClerkId(userId: string): Promise<IUser | null> {
  try {
    connectToDB();
    const user = await User.findOne({
      clerk_id: userId,
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Error fetching user by clerkId:", error);
    throw new Error("Failed to fetch user");
  }
}
