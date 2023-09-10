<script setup>
const route = useRoute();

const { data: page, error } = await useAsyncData("page", () =>
  $fetch(`/api/posts/` + route.params.page + "?type=page", {
    method: "GET",
  })
);
</script>
<template>
  <h1 class="text-3xl font-bold underline">{{ page.title }}</h1>
  <p>{{ page.content }}</p>
  <NuxtLink to="/">Home</NuxtLink>
</template>
