<script setup>
//const post = fetch("/api/posts/" + $route.params.name).then(response => response.json())
const { data: posts, error } = await useAsyncData(
  'posts',
  () => $fetch( `/api/posts/{{$route.params.name}}`, {
    method: 'GET'
  } )
);
</script>
<template>
  <h1>{{posts[0].title}}</h1>
  <p>{{posts[0].content}}</p>
</template>
