import posts from "../../models/post";
export default defineEventHandler(async (event) => {
  const postName = getRouterParam(event, "post");
  const { type, date } = getQuery(event);
  console.log(`GET /api/posts/${postName}`);
  try {
    console.log("Find post");
    const pagequery = {
      name: postName,
      page: true,
    };

    const postquery = {
      name: postName,
      page: false,
      createdAt: {},
    };

    const post_by_name = {
      name: postName,
      page: false,
    };

    let postData;

    switch(type) {
      case "page": 
        postData = await posts.findOne(pagequery);
        break;
      case "post":
        const start = new Date(date as Date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date as Date);
        end.setHours(23, 59, 59, 999);
        postquery.createdAt = {
          $gte: start,
          $lte: end,
        };
        postData = await posts.findOne(postquery);
        break;
      case "post_by_name":
        postData = await posts.findOne(post_by_name);
        break;
    }

    if (postData) {
      return {
        id: postData._id,
        name: postData.name,
        title: postData.title,
        content: postData.content,
        date: postData.createdAt,
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
