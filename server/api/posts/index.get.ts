import posts from "../../models/post";
export default defineEventHandler(async (event) => {
  console.log("GET /api/posts");
  const { type } = getQuery(event);
  const isPage = type == "page";
  try {
    console.log("Find posts");
    const postsData = await posts.find({ page: isPage });
    if (type == "count") {
      return {
        pages: (await posts.find({ page: true })).length,
        posts: (await posts.find({ page: false })).length,
      };
    } else {
      return postsData.map((post) => ({
        id: post._id,
        name: post.name,
        title: post.title,
        author: post.author,
        content: post.content,
        page: post.page,
        publishDate: {
          d: String(post.createdAt.getDate()).padStart(2, "0"),
          m: String(post.createdAt.getMonth() + 1).padStart(2, "0"),
          y: post.createdAt.getFullYear().toString(),
        },
      }));
    }
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Error",
    };
  }
});
