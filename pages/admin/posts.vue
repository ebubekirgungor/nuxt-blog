<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: "Posts",
});

interface Post {
  name: string;
  title: string;
  author: string;
}

const { data: posts } = await useFetch<Array<Post>>("/api/posts?type=post");
</script>
<template>
  <div>
    <div class="flex">
      <h1 class="text-2xl select-none pb-6">Posts</h1>
      <NuxtLink
        to="add-post"
        class="transition duration-200 ease-in-out px-6 py-1.5 w-20 h-9 ml-5 bg-sky-500 hover:bg-sky-700 rounded-md text-white"
      >
        Add
      </NuxtLink>
    </div>
    <table
      class="w-[calc(100vw-19rem)] mr-15 text-left border border-collapse border-0 overflow-hidden bg-white rounded-xl shadow-xl text-gray-500"
    >
      <thead class="select-none text-gray-700 bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="py-3 px-6 text-right">Author</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" class="bg-white border-b">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ post.title }}
          </td>
          <td class="px-6 py-4 text-right">
            {{ post.author }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
