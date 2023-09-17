<script setup lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: "Pages",
});

interface Page {
  name: string;
  title: string;
  author: string;
}

let pages: Page | any = ref({});
const { data: pagesdata } = await useFetch<Array<Page>>("/api/posts?type=page");
pages.value = pagesdata.value as Page[];

const getPages = async () => {
  const { data: getdata } = await useFetch<Array<Page>>("/api/posts?type=page");
  pages.value = getdata.value as Page[];
};

const deleteDialog = ref(false);
const name = ref("");
const deletePage = async (name: string) => {
  const { data: responseData } = await useFetch("/api/posts/" + name, {
    method: "delete",
  });
  switch (responseData.value) {
    case "POST_DELETED":
      toast.success("Page deleted");
      getPages();
      break;
    case "NOT_LOGGED_IN":
      toast.error("Page can't deleted - Please login");
      break;
    case "ERROR":
      toast.warning("Error");
      break;
  }
};

const button = ref(
  "transition duration-200 ease-in-out px-5 py-2 mt-7 bg-sky-500 hover:bg-sky-700 rounded-md text-white select-none"
);
</script>
<template>
  <div>
    <transition name="modal-fade" mode="out-in">
      <div
        v-if="deleteDialog"
        class="bg-black/50 inset-x-0 inset-y-0 w-full h-full fixed"
      >
        <div
          class="fixed mt-[16%] z-20 flex flex-col m-auto inset-x-0 inset-y-0 p-6 w-[350px] h-[200px] bg-white rounded-xl shadow-xl"
        >
          <h1 class="text-2xl text-center grow select-none pb-6">
            Are you sure ?
          </h1>
          <div class="flex justify-end space-x-2">
            <button
              @click="
                deletePage(name);
                deleteDialog = false;
              "
              :class="['!bg-red-600 hover:!bg-red-700', button]"
            >
              Delete
            </button>
            <button @click="deleteDialog = false" :class="button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </transition>
    <div class="flex">
      <h1 class="text-2xl select-none pb-6">Pages</h1>
      <NuxtLink
        to="add-page"
        class="transition duration-200 ease-in-out px-6 py-1.5 w-20 h-9 ml-5 bg-sky-500 hover:bg-sky-700 rounded-md text-white"
      >
        Add
      </NuxtLink>
    </div>
    <table
      class="w-[calc(100vw-19rem)] mr-15 text-left border border-collapse border-0 overflow-hidden bg-white rounded-xl shadow-xl text-gray-500"
    >
      <thead class="select-none text-gray-700 bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3">Name (URL)</th>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="py-3 pl-6">Author</th>
          <th scope="col" class="py-3 pr-6 float-right"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="page in pages" class="bg-white border-b">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            <NuxtLink :to="'/' + page.name">
              {{ page.name }}
            </NuxtLink>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            {{ page.title }}
          </td>
          <td class="pl-6 py-4">
            {{ page.author }}
          </td>
          <td class="py-2 pr-4 text-black flex float-right">
            <NuxtLink
              :to="'edit-page?page=' + page.name"
              class="transition duration-200 ease-in-out h-[40px] w-[40px] pl-2 pt-1.5 bg-black/10 hover:bg-black/20 rounded-full mr-2 cursor-pointer"
            >
              <Icon name="mdi:pencil-outline" />
            </NuxtLink>
            <div
              @click="
                deleteDialog = true;
                name = page.name;
              "
              class="transition duration-200 ease-in-out h-[40px] w-[40px] pl-2 pt-1.5 bg-black/10 hover:bg-black/20 rounded-full mr-2 cursor-pointer"
            >
              <Icon name="mdi:trash-can-outline" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>