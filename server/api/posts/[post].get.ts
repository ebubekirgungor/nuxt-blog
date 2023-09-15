import posts from "../../models/post";
export default defineEventHandler(async (event) => {
  const postName = getRouterParam(event, "post");
  const { type, date } = getQuery(event);
  const isPage = type == "page";
  console.log(`GET /api/posts/${postName}`);
  try {
    console.log("Find post");
    const query = {
      name: postName,
      page: isPage,
    };

    if (!isPage) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.createdAt = {
        $gte: start,
        $lte: end,
      };
    }
    const postData = await posts.findOne(query);
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
