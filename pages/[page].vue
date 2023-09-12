<script setup lang="ts">
const route = useRoute();

interface Page {
  name: string;
  title: string;
  content: string;
}

const { data: page } = await useFetch<Page>(
  `/api/posts/${route.params.page}?type=page`
);
</script>
<template>
  <div v-if="page" class="flex flex-col mt-14 ml-[32%]">
    <h1 class="text-[50px]">{{ page.title }}</h1>
    <p class="mt-14 text-[17px]">{{ page.content }}</p>
  </div>
</template>
