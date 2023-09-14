<script setup lang="ts">
useHead({
  title: "Blog",
});

interface Data {
  name: string;
  title: string;
  content: string;
  publishDate: { y: number; m: number; d: number };
}

const { data } = await useFetch("/api/posts");

var posts: Data[] = data["_rawValue" as keyof Object].filter(function (item: {
  page: boolean;
}) {
  return item.page === false;
});
</script>
<template>
  <div>
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
  </div>
</template>
