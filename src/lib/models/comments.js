import AppModel, { pb } from "./app_model";
import Swal from "sweetalert2";

class CommentsModel extends AppModel {
  preview(url) {
    Swal.fire({
      imageUrl: url,
      imageAlt: "Comment Pic",
      showConfirmButton: false,
      showCloseButton: true,
    });
  }

  async getEmails() {
    const data = await pb.collection("users").getFullList({ fields: "email" });

    const emails = data.map((item) => item.email);
    return emails;
  }
}

const Comment = new CommentsModel("user_sched_comments");

export default Comment;
