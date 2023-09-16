<script setup lang="ts">
useHead({
  title: "Blog",
});

interface Post {
  name: string;
  title: string;
  content: string;
  publishDate: { y: number; m: number; d: number };
}

const { data: posts } = await useFetch<Array<Post>>("/api/posts?type=post");
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
