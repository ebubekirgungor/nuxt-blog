<script setup>
const route = useRoute();

const { data: post, error } = await useAsyncData("post", () =>
  $fetch(`/api/posts/` + route.params.post + "?type=post", {
    method: "GET",
  })
);
</script>
<template>
  <h1 class="text-3xl font-bold underline">{{ post.title }}</h1>
  <p>{{ post.content }}</p>
  <NuxtLink to="/">Home</NuxtLink>
</template>
