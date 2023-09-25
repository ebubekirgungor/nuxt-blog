<script setup lang="ts">
const { t } = useI18n();
interface Page {
  name: string;
  title: string;
}

const { data: pages } = await useFetch<Array<Page>>("/api/posts?type=page");
const main = ref("h-screen bg-emerald-50");
const flex = ref(
  "flex pt-[3%] pl-5 pr-2 md:pl-[20%] md:pr-[20%] justify-between"
);
const flex_center = ref("grow flex items-center");
</script>

<template>
  <main :class="main">
    <div :class="flex">
      <div :class="flex_center">
        <NuxtLink to="/">{{ t("home") }}</NuxtLink>
      </div>
      <div class="p-2 md:p-5 whitespace-nowrap" v-for="page in pages">
        <NuxtLink :to="'/' + page.name">{{ page.title }}</NuxtLink>
      </div>
    </div>
    <div>
      <slot />
    </div>
  </main>
</template>
