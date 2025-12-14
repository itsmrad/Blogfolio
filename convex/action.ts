"use server";

import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";
import { postSchema } from "@/app/schemas/blog";
import { getToken } from "@/lib/auth-server";
import { api } from "./_generated/api";

export const createBlogAction = async (values: z.infer<typeof postSchema>) => {
  try {
    const parsed = postSchema.safeParse(values);

    if (!parsed.success) {
      throw new Error(parsed.error.message);
    }

    const token = await getToken();
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token },
    );
    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });
    if (!uploadResult) {
      return {
        error: "Failed to upload Image",
      };
    }

    const { storageId } = await uploadResult.json();

    await fetchMutation(
      api.posts.createPost,
      {
        body: parsed.data.content,
        title: parsed.data.title,
        imageStorageId: storageId,
      },
      { token },
    );
    revalidatePath("/blog");
  } catch (error) {
    return {
      error: "Failed to create Post",
    };
  }

  return redirect("/blog");
};
