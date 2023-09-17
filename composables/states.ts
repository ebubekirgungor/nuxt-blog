/*const { data: blog_title_data } = await useFetch("/api/options");
const blog_title = blog_title_data["_rawValue"].filter(function (option: {
  name: string;
}) {
  return option.name == "blog_title";
});*/
export const useActiveLink = () => useState<string>("activeLink", () => "");
export const useBlogTitle = () => useState<string>("blogTitle", () => "Blog");
