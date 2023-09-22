import users from "../../models/user";
import { getServerSession } from "#auth";
interface IRequestBody {
  username: string;
  email: string;
  password: string;
  name: string;
}
export default defineEventHandler(async (event) => {
  console.log("POST /api/users");
  const { username, email, password, name } = await readBody<IRequestBody>(
    event
  );
  const session = await getServerSession(event);
  try {
    const userData =
      (await users.findOne({
        email,
      })) ||
      (await users.findOne({
        username,
      }));
    if (userData) {
      console.log(`User with email ${email} already exists`);
      event.node.res.statusCode = 409;
      return "USER_EXISTS";
    } else if (!session) {
      event.node.res.statusCode = 403;
      return "NOT_LOGGED_IN";
    } else {
      console.log("Create user");
      await users.create({
        username,
        email,
        password,
        name,
      });
      event.node.res.statusCode = 200;
      return "SUCCESS";
    }
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return "ERROR";
  }
});
