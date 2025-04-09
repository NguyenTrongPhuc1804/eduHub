"use server";

import { User } from "@/database/user.model";
import { connectToDB } from "../mongoose";
import { ICreateUserParams } from "@/interfaces/user/user.interface";

export default async function CreateUser(
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
