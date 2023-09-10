<script setup lang="ts">
const route = useRoute();

interface Page {
  title: string;
  content: string;
}

const { data: page } = await useFetch<Page>(
  `/api/posts/${route.params.page}?type=page`
);
</script>
<template>
  <h1 class="text-3xl font-bold underline">{{ page!.title }}</h1>
  <p>{{ page!.content }}</p>
  <NuxtLink to="/">Home</NuxtLink>
</template>
