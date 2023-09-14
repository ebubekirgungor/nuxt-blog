<script setup lang="ts">
const route = useRoute();
const { data, signOut } = useAuth();
const main = ref("bg-emerald-50");
const nav = ref("bg-[#05211d] sticky w-full top-0");
const flex = ref("flex");
const sidebar = ref(
  "w-64 bg-[#05211d] text-white p-4 h-[calc(100vh-40px)] sticky left-0 top-10"
);
const link = ref(
  "transition duration-300 ease-in-out hover:scale-105 flex select-none hover:bg-[#fff]/10 rounded-md p-3"
);
const active = ref("bg-[#055d49] pointer-events-none");
const user_menu = ref(
  "flex flex-col justify-between transition-visibility duration-300 ease-in-out absolute w-[100px] h-[85px] invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-white rounded-lg shadow-xl mt-0 group-hover:mt-3 p-3"
);
const activeLink = ref(route.path);

const setActiveLink = (link: string) => {
  activeLink.value = link;
};
</script>
<template>
  <main :class="main">
    <nav :class="nav">
      <div class="mx-auto px-2 sm:px-6 lg:px-3">
        <div class="relative flex h-10 items-center justify-between">
          <div class="grow flex items-center ml-4">
            <NuxtLink class="text-white" to="/">Home</NuxtLink>
          </div>
          <div>
            <div
              class="relative w-[100px] h-[32px] group bg-white rounded-lg select-none"
            >
              <div class="flex justify-between md:cursor-pointer pt-1 pl-3">
                <span>{{ data!.user!.email }}</span>
                <svg
                  class="w-2.5 h-2.5 mr-2 mt-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="gray"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </div>
              <div :class="user_menu">
                <div>
                  <NuxtLink
                    @click="setActiveLink('/admin/profile')"
                    to="/admin/profile"
                    >Profile</NuxtLink
                  >
                </div>
                <div @click="signOut()" class="cursor-pointer">Logout</div>
              </div>
            </div>
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
