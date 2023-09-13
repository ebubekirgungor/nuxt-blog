<script setup lang="ts">
const main = ref("bg-emerald-50");
const nav = ref("bg-[#05211d] sticky w-full top-0");
const flex = ref("flex");
const sidebar = ref(
  "w-64 bg-[#05211d] text-white p-4 h-[calc(100vh-40px)] sticky left-0 top-10"
);
const link = ref("flex select-none hover:bg-[#fff]/10 rounded-md p-3");
</script>
<template>
  <main :class="main">
    <nav :class="nav">
      <div class="mx-auto px-2 sm:px-6 lg:px-8">
        <div class="relative flex h-10 items-center justify-between">
          <div class="grow flex items-center">
            <h1 class="text-white">Test</h1>
          </div>
          <div>
            <h1 class="text-white">profile</h1>
          </div>
        </div>
      </div>
    </nav>
    <div :class="flex">
      <aside :class="sidebar">
        <ul>
          <li class="pb-1">
            <NuxtLink :class="link" to="/admin/posts">Posts</NuxtLink>
          </li>
          <li class="pb-1">
            <NuxtLink :class="link" to="/admin/profile">Profile</NuxtLink>
          </li>
          <li class="pb-1">
            <NuxtLink :class="link" to="/admin/users">Users</NuxtLink>
          </li>
          <li class="pb-1">
            <NuxtLink :class="link" to="/admin/settings">Settings</NuxtLink>
          </li>
        </ul>
      </aside>
      <div class="p-4">
        <slot />
      </div>
    </div>
  </main>
</template>
