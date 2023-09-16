import users from "../../models/user";
import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "id");
  console.log(`Delete /api/users/${userId}`);
  const session = await getServerSession(event);
  try {
    console.log("Find user");
    if (session) {
      await users.deleteOne({
        _id: userId,
      });
      return "USER_DELETED";
    } else {
      return "NOT_LOGGED_IN";
    }
  } catch (err) {
    console.dir(err);
    return "ERROR";
  }
});
