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
  <div class="relative overflow-x-auto">
    <table
      class="w-[calc(100vw-19rem)] fixed mr-15 text-left border border-collapse border-0 overflow-hidden bg-white rounded-xl shadow-xl text-gray-500"
    >
      <thead class="select-none text-gray-700 bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Username</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="px-6 py-3 text-right">Posts</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" class="bg-white border-b">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ user!.username }}
          </td>
          <td class="px-6 py-4">
            {{ user!.email }}
          </td>
          <td class="px-6 py-4">
            {{ user!.name }}
          </td>
          <td class="px-6 py-4 text-right">
            {{ user!.posts }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
