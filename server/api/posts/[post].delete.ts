import posts from "../../models/post";
import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  const postId = getRouterParam(event, "post");
  console.log(`Delete /api/posts/${postId}`);
  const session = await getServerSession(event);
  try {
    console.log("Find post");
    if (session) {
      await posts.deleteOne({
        name: postId,
      });
      return "POST_DELETED";
    } else {
      return "NOT_LOGGED_IN";
    }
  } catch (err) {
    console.dir(err);
    return "ERROR";
  }
});
