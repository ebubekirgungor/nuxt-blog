<script setup lang="ts">
const route = useRoute();

interface Post {
  title: string;
  content: string;
}

const date = route.path.split("/");

const { data: post } = await useFetch<Post>(
  `/api/posts/${route.params.post}?type=post&date=${date[1]}-${date[2]}-${date[3]}`
);

useHead({
  title: post.value!.title,
});
</script>
<template>
  <h1 class="text-3xl font-bold underline">{{ post!.title }}</h1>
  <p>{{ post!.content }}</p>
  <NuxtLink to="/">Home</NuxtLink>
</template>
