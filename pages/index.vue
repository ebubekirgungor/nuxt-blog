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
  <h1>Pages:</h1>
  <div v-for="page in pages">
    <NuxtLink :to="page.name">{{ page.title }}</NuxtLink>
  </div>

  <h1>Posts:</h1>
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
</template>
