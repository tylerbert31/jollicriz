import Comment from "@/lib/models/comments";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const formData = await request.formData();
  const id = formData.get("user_id");
  const comment = formData.get("comment");
  const image = formData.get("image") ?? null;

  const data = {
    user_id: id,
    comment: comment,
  };
  if (typeof image == "object") {
    data.image = image;
  }

  try {
    await Comment.save(data);
    revalidatePath("/home");
    return Response.json({ message: "success", status: 200 }, { status: 200 });
  } catch (error) {
    return Response.json({ message: error, status: 404 }, { status: 308 });
  }
}
