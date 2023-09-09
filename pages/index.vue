<script setup >
//const posts = fetch("/api/posts").then(response => response.json())
const { data: posts, error } = await useAsyncData(
  'posts',
  () => $fetch( `/api/posts`, {
    method: 'GET'
  } )
);
</script>
<template>
    <div v-for="post in posts.data">
        <NuxtLink to=/{{post.name}}>{{post.title}}</NuxtLink>
    </div>
</template>