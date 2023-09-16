import users from "../../models/user";
export default defineEventHandler(async (event) => {
  const userEmail = getRouterParam(event, "email");
  console.log(`GET /api/users/${userEmail}`);
  try {
    console.log("Find user");
    const userData = await users.findOne({
      "email": userEmail,
    });
    if (userData) {
      console.log("User found");
      return {
        username: userData.username,
      };
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