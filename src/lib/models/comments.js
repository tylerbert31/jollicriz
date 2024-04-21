import AppModel, { pb } from "./app_model";

class CommentsModel extends AppModel {}

const Comment = new CommentsModel("user_sched_comments");

export default Comment;
