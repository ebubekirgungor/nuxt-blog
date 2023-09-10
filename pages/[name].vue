<script setup>
const route = useRoute();

const { data: post, error } = await useAsyncData("post", () =>
  $fetch(`/api/posts/` + route.params.name, {
    method: "GET",
  })
);
</script>
<template>
  <h1>{{ post.title }}</h1>
  <p>{{ post.content }}</p>
  <NuxtLink to="/">Home</NuxtLink>
</template>
