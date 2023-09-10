import posts from "../../models/post";
interface IRequestBody {
  name: string;
  author: string;
  title: string;
  content: string;
  page: boolean;
}
export default defineEventHandler(async (event) => {
  console.log("POST /api/posts");
  const { name, author, title, content, page } = await readBody<IRequestBody>(event);
  try {
    const postData = await posts.findOne({
      name,
    });
    if (postData) {
      console.log(`Post with name ${name} already exists`);
      event.res.statusCode = 409;
      return {
        code: "POST_EXISTS",
        message: "Post with given name already exists.",
      };
    } else {
      console.log("Create post");
      const newPostData = await posts.create({
        name,
        author,
        title,
        content,
        page,
      });
      return {
        id: newPostData._id,
        name: newPostData.name,
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
