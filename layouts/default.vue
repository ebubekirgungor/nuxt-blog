<script setup lang="ts">
interface Data {
  name: string;
  title: string;
  content: string;
  publishDate: { y: number; m: number; d: number };
}

const { data } = await useFetch("/api/posts");

var pages: Data[] = data["_rawValue" as keyof Object].filter(function (item: {
  page: boolean;
}) {
  return item.page === true;
});

const main = ref('h-screen bg-emerald-50');
const flex = ref('flex pt-[3%] pl-[20%] pr-[20%]');
const flex_center = ref('grow flex items-center');
</script>

<template>
  <main :class="main">
    <div :class="flex">
      <div :class="flex_center">
        <NuxtLink to="/">Home</NuxtLink>
      </div>
      <div class="p-5" v-for="page in pages">
        <NuxtLink :to="page.name">{{ page.title }}</NuxtLink>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </main>
</template>
