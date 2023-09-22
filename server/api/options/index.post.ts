import options from "../../models/option";
import { getServerSession } from "#auth";
interface IRequestBody {
  option: string;
  value: string;
}
export default defineEventHandler(async (event) => {
  console.log("POST /api/options");
  const { option, value } = await readBody<IRequestBody>(event);
  const session = await getServerSession(event);
  try {
    if (session) {
      await options.updateMany(
        { option: option },
        {
          value: value,
        }
      );
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
