<script setup lang="ts">
const route = useRoute();
const { data } = useAuth();
const main = ref("bg-emerald-50");
const nav = ref("bg-[#05211d] sticky w-full top-0");
const flex = ref("flex");
const sidebar = ref(
  "w-64 bg-[#05211d] text-white p-4 h-[calc(100vh-40px)] sticky left-0 top-10"
);
const link = ref(
  "transition duration-300 ease-in-out flex select-none hover:bg-[#fff]/10 rounded-md p-3"
);
const active = ref("bg-[#055d49] pointer-events-none");
const activeLink = ref(route.path);

const setActiveLink = (link: string) => {
  activeLink.value = link;
};
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
            <NuxtLink
              @click="setActiveLink('/admin/profile')"
              to="/admin/profile"
              class="text-white"
              >{{ data!.user!.email }}</NuxtLink
            >
          </div>
        </div>
      </div>
    </nav>
    <div :class="flex">
      <aside :class="sidebar">
        <ul>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === '/admin' ? active : '']"
              @click="setActiveLink('/admin')"
              to="/admin"
              >Dashboard</NuxtLink
            >
          </li>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === '/admin/pages' ? active : '']"
              @click="setActiveLink('/admin/pages')"
              to="/admin/pages"
              >Pages</NuxtLink
            >
          </li>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === '/admin/posts' ? active : '']"
              @click="setActiveLink('/admin/posts')"
              to="/admin/posts"
              >Posts</NuxtLink
            >
          </li>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === '/admin/profile' ? active : '']"
              @click="setActiveLink('/admin/profile')"
              to="/admin/profile"
              >Profile</NuxtLink
            >
          </li>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === '/admin/users' ? active : '']"
              @click="setActiveLink('/admin/users')"
              to="/admin/users"
              >Users</NuxtLink
            >
          </li>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === '/admin/settings' ? active : '']"
              @click="setActiveLink('/admin/settings')"
              to="/admin/settings"
              >Settings</NuxtLink
            >
          </li>
        </ul>
      </aside>
      <div class="p-6">
        <slot />
      </div>
    </div>
  </main>
</template>
