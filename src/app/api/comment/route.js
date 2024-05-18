import Comment from "@/lib/models/comments";
import { revalidatePath } from "next/cache";
import nodemailer from "nodemailer";
import template from "@/lib/mailer/body";

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
    const new_comment = await Comment.save(data);
    await sendEmail(new_comment);
    revalidatePath("/home");
    return Response.json(
      { message: "success", status: 200, comment_id: new_comment.id },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: error, status: 404 }, { status: 308 });
  }
}

export async function PATCH() {
  return Response.json(
    { message: "success! sent to " + (await sendEmail()), status: 200 },
    { status: 200 }
  );
}

async function sendEmail(new_comment) {
  const emails = await Comment.getEmails();
  new_comment = await Comment.findById(new_comment.id, {
    expand: "user_id",
  });
  const user = new_comment.expand.user_id;
  const filteredEmails = emails.filter((email) => !email.includes(user.email));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: "Jollicriz@gmail.com",
    to: filteredEmails.join(", "),
    subject: `[Jollicriz] ${user.username} just posted a thread!`,
    html: template({
      name: user.username,
      message: new_comment.comment,
      image: Comment.getImage(user, "profile_pic"),
      link: `${Comment.baseURL}/threads/${new_comment.id}`,
    }),
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }

  return filteredEmails.join(", ");
}
