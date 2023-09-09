import { users } from "../../models";
interface IRequestBody {
  email: string;
  password: string;
}
export default defineEventHandler(async (event) => {
  console.log("POST /api/users/signin");
  const { email, password } = await readBody<IRequestBody>(event);
  // Check if email is passed.
  if (!email) {
    event.res.statusCode = 400;
    return {
      code: "EMAIL_REQUIRED",
      message: "Body malformed: email is required.",
    };
  }
  // Check if password is passed.
  if (!password) {
    event.res.statusCode = 400;
    return {
      code: "PASSWORD_REQUIRED",
      message: "Body malformed: password is required.",
    };
  }
  try {
    console.log("Find user");
    const userData = await users.findOne({
      email: email.toLowerCase(),
    });
    if (userData) {
      console.log("User found");
      const isPasswordValid = await userData.verifyPasswordSync(password);
      if (isPasswordValid) {
        // Generate token or create session here
        return {
          id: userData._id,
          name: userData.name,
        };
      } else {
        console.log("Password is not valid");
        event.res.statusCode = 404;
        return {
          code: "USER_NOT_FOUND",
          message: "User with given email and password doesn't exists.",
        };
      }
    } else {
      console.log("User not found");
      event.res.statusCode = 404;
      return {
        code: "USER_NOT_FOUND",
        message: "User with given email and password doesn't exists.",
      };
    }
  } catch (err) {
    console.dir(err);
    event.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something wrong.",
    };
  }
});