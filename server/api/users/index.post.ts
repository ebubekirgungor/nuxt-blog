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
      return "USER_EXISTS";
      event.res.statusCode = 409;
    } else if (!session) {
      return "NOT_LOGGED_IN";
      event.res.statusCode = 403;
    } else {
      console.log("Create user");
      await users.create({
        username,
        email,
        password,
        name,
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
