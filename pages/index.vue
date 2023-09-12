<script setup lang="ts">
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
  <main class="h-screen bg-emerald-50">
    <div class="flex pt-[3%] pl-[20%] pr-[20%]">
      <div class="grow flex items-center">
        <NuxtLink to="/">Home</NuxtLink>
      </div>
      <div class="p-5" v-for="page in pages">
        <NuxtLink :to="page.name">{{ page.title }}</NuxtLink>
      </div>
    </div>
    <div v-for="post in posts">
      <NuxtLink
        :to="
          post.publishDate.y +
          '/' +
          post.publishDate.m +
          '/' +
          post.publishDate.d +
          '/' +
          post.name
        "
        >{{ post.title }}</NuxtLink
      >
    </div>
  </main>
</template>
