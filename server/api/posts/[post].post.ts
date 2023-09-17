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
  const postName = getRouterParam(event, "post");
  console.log(`POST /api/posts/${postName}`);
  const { name, author, title, content, page } = await readBody<IRequestBody>(
    event
  );
  const session = await getServerSession(event);
  try {
    if (session) {
      await posts.updateOne(
        { name: postName },
        {
          name: name,
          author: author,
          title: title,
          content: content,
          page: page,
        }
      );
      return "SUCCESS";
    } else {
      return "NOT_LOGGED_IN";
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
