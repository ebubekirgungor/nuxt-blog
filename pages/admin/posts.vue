<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: "Posts",
});
</script>
<template>
  <h1>posts</h1>
</template>
