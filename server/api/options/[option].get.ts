import options from "../../models/option";
export default defineEventHandler(async (event) => {
  const optionName = getRouterParam(event, "option");
  console.log(`GET /api/options/${optionName}`);
  try {
    console.log("Find post");
    const optionData = await options.findOne({
      name: optionName,
    });
    if (optionData) {
      return {
        value: optionData.value,
      };
    } else {
      console.log("Option not found");
      event.node.res.statusCode = 404;
      return {
        code: "OPTION_NOT_FOUND",
        message: `Option with name ${optionName} doesn't exists.`,
      };
    }
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Error",
    };
  }
});
