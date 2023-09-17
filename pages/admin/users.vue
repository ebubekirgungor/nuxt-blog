<script setup lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: "Users",
});

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  posts: number;
}

const { data } = useAuth();
const { data: currentuser } = await useFetch<string | any>(
  "/api/users/" + data!.value!.user!.id
);

let users: User | any = ref({});
const { data: usersdata } = await useFetch<Array<User>>("/api/users");
users.value = usersdata.value as User[];

const getUsers = async () => {
  const { data: getdata } = await useFetch<Array<User>>("/api/users");
  users.value = getdata.value as User[];
};

const deleteDialog = ref(false);
const id = ref("");
const deleteUser = async (id: string) => {
  const { data: responseData } = await useFetch("/api/users/" + id, {
    method: "delete",
  });
  switch (responseData.value) {
    case "USER_DELETED":
      toast.success("User deleted");
      getUsers();
      break;
    case "NOT_LOGGED_IN":
      toast.error("User can't deleted - Please login");
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
<style>
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
                deleteUser(id);
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
      <h1 class="text-2xl select-none pb-6">Users</h1>
      <NuxtLink
        to="add-user"
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
          <th scope="col" class="px-6 py-3">Username</th>
          <th scope="col" class="py-3">Email</th>
          <th scope="col" class="px-6 py-3">Name</th>
          <th scope="col" class="py-3 pl-6 text-center">Posts</th>
          <th scope="col" class="py-3 pr-6 float-right"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" class="bg-white border-b">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
            {{ user.username }}
          </td>
          <td class="py-4">
            {{ user.email }}
          </td>
          <td class="px-6 py-4">
            {{ user.name }}
          </td>
          <td class="py-4 pl-6 text-center">
            {{ user.posts }}
          </td>
          <td class="py-2 pr-4 text-black flex float-right">
            <NuxtLink
              :to="'edit-user?id=' + user.id"
              class="transition duration-200 ease-in-out h-[40px] w-[40px] pl-2 pt-1.5 bg-black/10 hover:bg-black/20 rounded-full mr-2 cursor-pointer"
            >
              <Icon name="mdi:pencil-outline" />
            </NuxtLink>
            <div
              v-if="user.username == currentuser.username"
              class="h-[40px] w-[40px] pl-2 pt-1.5 text-slate-500 bg-black/10 rounded-full mr-2"
            >
              <Icon name="mdi:trash-can-outline" />
            </div>
            <div
              v-else
              @click="
                deleteDialog = true;
                id = user.id;
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
