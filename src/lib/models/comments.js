import AppModel, { pb } from "./app_model";
import Swal from "sweetalert2";

class CommentsModel extends AppModel {
  preview(url) {
    Swal.fire({
      imageUrl: url,
      imageAlt: "Comment Pic",
      heightAuto: true,
      showConfirmButton: false,
      imageHeight: "80%",
      showCloseButton: true,
    });
  }
}

const Comment = new CommentsModel("user_sched_comments");

export default Comment;
