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

const flex = ref('flex flex-col mt-14 ml-[10%] md:ml-[32%]');
const title = ref('text-[50px]');
const content = ref('mt-14 text-[17px]');
</script>
<template>
  <div v-if="post" :class="flex">
    <h1 :class="title">{{ post.title }}</h1>
    <p :class="content">{{ post.content }}</p>
  </div>
</template>
