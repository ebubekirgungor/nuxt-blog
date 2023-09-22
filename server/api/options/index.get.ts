import options from "../../models/option";
export default defineEventHandler(async (event) => {
  console.log("GET /api/options");
  try {
    console.log("Find options");
    const optionsData = await options.find();
    return optionsData.map((option) => ({
      name: option.name,
      value: option.value,
    }));
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Error",
    };
  }
});
