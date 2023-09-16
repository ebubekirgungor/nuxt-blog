import posts from "../../models/post";
import { getServerSession } from "#auth";
interface IRequestBody {
  name: string;
  author: string;
  title: string;
  content: string;
  page: boolean;
}
export default defineEventHandler(async (event) => {
  console.log("POST /api/posts");
  const { name, author, title, content, page } = await readBody<IRequestBody>(
    event
  );
  const session = await getServerSession(event);
  try {
    const postData = await posts.findOne({
      name,
    });
    if (postData) {
      console.log(`Post with name ${name} already exists`);
      return "POST_EXISTS";
      event.res.statusCode = 409;
    } else if (!session) {
      return "NOT_LOGGED_IN";
      event.res.statusCode = 403;
    } else {
      console.log("Create post");
      const newPostData = await posts.create({
        name,
        author,
        title,
        content,
        page,
      });
      return "SUCCESS";
      event.res.statusCode = 200;
    }
  } catch (err) {
    console.dir(err);
    return "ERROR";
    event.res.statusCode = 500;
  }
});
