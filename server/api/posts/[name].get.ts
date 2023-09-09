import posts from "../../models/post";
export default defineEventHandler(async (event) => {
  const postName = getRouterParam(event, "name");
  console.log(`GET /api/posts/${postName}`);
  try {
    console.log("Find post");
    const postData = await posts.findOne({
      "name": postName,
    });
    if (postData) {
      return {
        id: postData._id,
        title: postData.title,
        content: postData.content,
      };
    } else {
      console.log("Post not found");
      event.res.statusCode = 404;
      return {
        code: "POST_NOT_FOUND",
        message: `Post with name ${postName} doesn't exists.`,
      };
    }
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Error",
    };
  }
});