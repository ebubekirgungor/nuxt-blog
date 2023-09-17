<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
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