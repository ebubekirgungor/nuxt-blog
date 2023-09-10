<script setup>
const { data: posts, error } = await useAsyncData("posts", () =>
  $fetch(`/api/posts`, {
    method: "GET",
  })
);
</script>
<template>
  <div v-for="post in posts">
    <NuxtLink :to="post.name">{{ post.title }}</NuxtLink>
  </div>
</template>
