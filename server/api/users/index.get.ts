import users from "../../models/user";
export default defineEventHandler(async (event) => {
  console.log("GET /api/users");
  try {
    console.log("Find users");
    const usersData = await users.find();
    return usersData.map((user) => ({
      id: user._id,
      username: user.username,
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