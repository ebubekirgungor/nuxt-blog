<script setup lang="ts">
const route = useRoute();

interface Page {
  name: string;
  title: string;
  content: string;
}

const { data } = await useFetch("/api/posts");

var pages: Page[] = data["_rawValue" as keyof Object].filter(function (item: {
  page: boolean;
}) {
  return item.page === true;
});

const { data: page } = await useFetch<Page>(
  `/api/posts/${route.params.page}?type=page`
);
</script>
<template>
  <main class="h-screen bg-emerald-50">
    <div class="flex pt-[3%] pl-[20%] pr-[20%]">
      <div class="grow flex items-center">
        <NuxtLink to="/">Home</NuxtLink>
      </div>
      <div class="p-5" v-for="page in pages">
        <NuxtLink :to="page.name">{{ page.title }}</NuxtLink>
      </div>
    </div>
    <div class="flex flex-col mt-14 ml-[32%]">
      <h1 class="text-[50px]">{{ page!.title }}</h1>
      <p class="mt-14 text-[17px]">{{ page!.content }}</p>
    </div>
  </main>
</template>
