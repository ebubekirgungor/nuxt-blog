<script setup lang="ts">
const route = useRoute();
const { data, signOut } = useAuth();
const { data: user } = await useFetch<string | any>(
  "/api/users/" + (data!.value!.user as any).id
);
const main = ref("bg-emerald-50");
const nav = ref("bg-[#05211d] sticky w-full top-0");
const flex = ref("flex");
const sidebar = ref(
  "min-w-[16rem] bg-[#05211d] text-white p-4 h-[calc(100vh-40px)] sticky left-0 top-10"
);
const link = ref(
  "transition duration-300 ease-in-out hover:scale-105 flex select-none hover:bg-[#fff]/10 rounded-md p-3"
);
const active = ref("bg-[#055d49] pointer-events-none");
const user_menu = ref(
  "flex flex-col justify-between transition-visibility duration-300 ease-in-out absolute w-[100px] h-[85px] invisible group-hover:visible opacity-0 group-hover:opacity-100 bg-white rounded-lg shadow-xl mt-0 group-hover:mt-3 p-3"
);

const activeLink = useActiveLink();
activeLink.value = route.name?.toString().replace("admin-", "") as string;

const setActiveLink = (link: string) => {
  activeLink.value = link;
};
</script>
<template>
  <main :class="main">
    <nav :class="nav">
      <div class="mx-auto px-2 sm:px-6 lg:px-3">
        <div class="flex h-10 items-center justify-between">
          <div class="grow flex items-center ml-4">
            <NuxtLink class="text-white select-none" to="/">{{
              $t("home")
            }}</NuxtLink>
          </div>
          <div>
            <div
              class="min-w-[100px] h-[32px] group bg-white rounded-lg select-none"
            >
              <div class="flex justify-between md:cursor-pointer pt-1 pl-3">
                <span>{{ user!.username }}</span>
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
                    @click="setActiveLink('profile')"
                    :to="'/admin/edit-user?id=' + user.id"
                    >{{ $t("profile") }}</NuxtLink
                  >
                </div>
                <div @click="signOut()" class="cursor-pointer">
                  {{ $t("logout") }}
                </div>
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
              :class="[link, activeLink === 'admin' ? active : '']"
              @click="setActiveLink('admin')"
              to="/admin"
              ><Icon class="mr-2" name="mdi:view-dashboard-outline" />{{
                $t("dashboard")
              }}</NuxtLink
            >
          </li>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === 'pages' ? active : '']"
              @click="setActiveLink('pages')"
              to="/admin/pages"
              ><Icon class="mr-2" name="mdi:text-box-multiple-outline" />{{
                $t("pages")
              }}</NuxtLink
            >
          </li>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === 'posts' ? active : '']"
              @click="setActiveLink('posts')"
              to="/admin/posts"
              ><Icon class="mr-2" name="mdi:pin-outline" />{{
                $t("posts")
              }}</NuxtLink
            >
          </li>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === 'users' ? active : '']"
              @click="setActiveLink('users')"
              to="/admin/users"
              ><Icon class="mr-2" name="mdi:account-group-outline" />{{
                $t("users")
              }}</NuxtLink
            >
          </li>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === 'profile' ? active : '']"
              @click="setActiveLink('profile')"
              ref="profile"
              :to="'/admin/edit-user?id=' + user.id"
              ><Icon class="mr-2" name="mdi:account-outline" />{{
                $t("profile")
              }}</NuxtLink
            >
          </li>
          <li class="pb-1">
            <NuxtLink
              :class="[link, activeLink === 'settings' ? active : '']"
              @click="setActiveLink('settings')"
              to="/admin/settings"
              ><Icon class="mr-2" name="mdi:cog-outline" />{{
                $t("settings")
              }}</NuxtLink
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
