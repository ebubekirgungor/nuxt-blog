<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: "Dashboard",
});
interface Data {
  name: string;
  title: string;
  content: string;
  publishDate: { y: number; m: number; d: number };
}

const { data } = await useFetch("/api/posts");

var pages: Data[] = data["_rawValue" as keyof Object].filter(function (item: {
  page: boolean;
}) {
  return item.page === true;
});

var posts: Data[] = data["_rawValue" as keyof Object].filter(function (item: {
  page: boolean;
}) {
  return item.page === false;
});
</script>
<template>
  <div
    class="flex flex-col justify-between text-2xl bg-white min-w-[300px] min-h-[175px] rounded-xl shadow-xl p-8 select-none"
  >
    <div class="flex justify-between">
      <span>Pages:</span>
      <span>{{ pages.length }}</span>
    </div>
    <div class="flex justify-between">
      <span>Posts:</span>
      <span>{{ posts.length }}</span>
    </div>
  </div>
</template>
