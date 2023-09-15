import users from "../../models/user";
interface IRequestBody {
  username: string;
  email: string;
  password: string;
  name: string;
}
export default defineEventHandler(async (event) => {
  console.log("POST /api/users");
  const { username, email, password, name } = await readBody<IRequestBody>(event);
  try {
    const userData = await users.findOne({
      email,
    });
    if (userData) {
      console.log(`User with email ${email} already exists`);
      event.res.statusCode = 409;
      return {
        code: "USER_EXISTS",
        message: "User with given email already exists.",
      };
    } else {
      console.log("Create user");
      const newUserData = await users.create({
        username,
        email,
        password,
        name,
      });
      return "User added";
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