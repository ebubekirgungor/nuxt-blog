<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: "Users",
});

const { data: users } = await useFetch("/api/users");
</script>
<template>
  <div>
    <div class="flex">
      <h1 class="text-2xl select-none pb-6">Users</h1>
      <NuxtLink
        to="add-user" class="transition duration-200 ease-in-out px-6 py-1.5 w-20 h-9 ml-5 bg-sky-500 hover:bg-sky-700 rounded-md text-white"
      >
        Add
      </NuxtLink>
    </div>
    <table
      class="w-[calc(100vw-19rem)] mr-15 text-left border border-collapse border-0 overflow-hidden bg-white rounded-xl shadow-xl text-gray-500"
    >
      <thead class="select-none text-gray-700 bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Username</th>
          <th scope="col" class="py-3">Email</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="py-3 px-6 text-right">Posts</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" class="bg-white border-b">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ user!.username }}
          </td>
          <td class="py-4">
            {{ user!.email }}
          </td>
          <td class="px-6 py-4">
            {{ user!.name }}
          </td>
          <td class="py-4 px-6 text-right">
            {{ user!.posts }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
