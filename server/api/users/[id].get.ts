import users from "../../models/user";
import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  const userEmail = getRouterParam(event, "id");
  console.log(`GET /api/users/${userEmail}`);
  const session = await getServerSession(event);
  try {
    console.log("Find user");
    const userData = await users.findOne({
      email: userEmail,
    });
    if (userData) {
      console.log("User found");
      return {
        username: userData.username,
      };
    } else if (!session) {
      return "NOT_LOGGED_IN";
    } else {
      console.log("User not found");
      event.res.statusCode = 404;
      return {
        code: "USER_NOT_FOUND",
        message: `User with id ${userEmail} doesn't exists.`,
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
