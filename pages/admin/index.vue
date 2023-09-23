<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: "Dashboard",
});

interface Count {
  pages: number;
  posts: number;
}

const { data: count } = await useFetch<Count | any>("/api/posts?type=count");

const box = ref("scale-75 md:scale-100 flex flex-col justify-between text-2xl bg-white min-w-[300px] min-h-[175px] rounded-xl shadow-xl p-8 select-none");
</script>
<template>
  <div
    :class="box"
  >
    <div class="flex justify-between">
      <span>Pages:</span>
      <span>{{ count.pages }}</span>
    </div>
    <div class="flex justify-between">
      <span>Posts:</span>
      <span>{{ count.posts }}</span>
    </div>
  </div>
</template>
