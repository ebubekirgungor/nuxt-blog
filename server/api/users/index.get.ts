import users from "../../models/user";
import posts from "../../models/post";
export default defineEventHandler(async (event) => {
  console.log("GET /api/users");
  try {
    console.log("Find users");
    const usersData = await users.find();

    const userDataWithPosts = await Promise.all(
      usersData.map(async (user) => {
        const userPosts = await posts.find({ author: user.username, page: false });
        return {
          id: user._id,
          username: user.username,
          email: user.email,
          name: user.name,
          posts: userPosts.length,
        };
      })
    );

    return userDataWithPosts;
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Error",
    };
  }
});
