export const useActiveLink = () => useState<string>("activeLink", () => "");
export const useBlogTitle = async () =>
  await useFetch("/api/options/blog_title");
