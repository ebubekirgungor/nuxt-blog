<script setup>

const { data: data } = await useFetch('/api/posts')

var pages = data["_rawValue"].filter(function(item) {
  return item.page === true;
});

var posts = data["_rawValue"].filter(function(item) {
  return item.page === false;
});

</script>
<template>
  <h1>Pages:</h1>
  <div v-for="page in pages">
    <NuxtLink :to="page.name">{{ page.title }}</NuxtLink>
  </div>

  <h1>Posts:</h1>
  <div v-for="post in posts">
    <NuxtLink :to="post.publishDate.y + '/' + post.publishDate.m + '/' + post.publishDate.d + '/' + post.name">{{ post.title }}</NuxtLink>
  </div>
</template>
