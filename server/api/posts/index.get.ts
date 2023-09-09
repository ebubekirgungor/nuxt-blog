import posts from "../../models/post";
export default defineEventHandler(async (event) => {
  console.log("GET /api/posts");
  try {
    console.log("Find posts");
    const postsData = await posts.find();
    return postsData.map((post) => ({
      id: post._id,
      name: post.name,
      title: post.title,
      content: post.content,
    }));
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Error",
    };
  }
});