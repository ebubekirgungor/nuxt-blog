import options from "../../models/option";
import { getServerSession } from "#auth";
export default defineEventHandler(async (event) => {
  console.log("POST /api/options");
  const body = await readBody(event);
  const session = await getServerSession(event);
  try {
    if (session) {
      for (var i = 0; i < body.length; i++) {
        await options.updateMany(
          { name: body[i].option },
          {
            value: body[i].value,
          }
        );
      }
      return "SUCCESS";
    } else {
      return "NOT_LOGGED_IN";
    }
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return "ERROR";
  }
});
