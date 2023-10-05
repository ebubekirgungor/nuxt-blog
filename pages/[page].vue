<script setup lang="ts">
const route = useRoute();

interface Page {
  title: string;
  content: string;
}
const { data: page } = await useFetch<Page>(
  `/api/posts/${route.params.page}?type=page`
);

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: "Page Not Found" });
}

useHead({
  title: page.value!.title,
});

const flex = ref("flex flex-col mt-14 ml-[10%] md:ml-[32%]");
const title = ref("text-[50px]");
const content = ref("mt-14 max-w-[650px] text-[17px]");
</script>
<template>
  <div v-if="page" :class="flex">
    <h1 :class="title">{{ page.title }}</h1>
    <p :class="content">{{ page.content }}</p>
  </div>
</template>
