import { CreateUser } from "@/lib/action/user.action";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function POST(req: Request) {
  // const headersList = await headers();
  const svix_id = req.headers.get("svix-id") ?? "";
  const svix_timestamp = req.headers.get("svix-timestamp") ?? "";
  const svix_signature = req.headers.get("svix-signature") ?? "";

  if (!process.env.WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET is not set");
  }

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Bad Request", { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const sivx = new Webhook(webhookSecret);

  let msg: WebhookEvent;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.log("Error verifying webhook", err);
    return new Response("Bad Request", { status: 400 });
  }

  const eventType = msg.type;

  if (eventType === "user.created") {
    const { username, id, email_addresses, image_url } = msg.data;

    const user = await CreateUser({
      clerk_id: id,
      username: username!,
      name: username!,
      email: email_addresses?.[0]?.email_address || "test@gmail.com",
      avatar: image_url,
    });

    return NextResponse.json({
      message: "OK",
      user,
    });
  }

  // Rest

  return new Response("OK", { status: 200 });
}
