<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const lang = await useFetch("/api/options/lang");
locale.value = (lang as any).data.value.value;
</script>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(3px);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.3s;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  transform: translateY(30px);
  opacity: 0;
}
</style>
