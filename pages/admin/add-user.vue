<script setup lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();
const activeLink = useActiveLink();
activeLink.value = "users";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: "Add User",
});
const input = ref(
  "transition duration-200 ease-in-out ml-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-[250px] h-9 p-2.5"
);
const label = ref("select-none mt-1");
const button = ref(
  "transition duration-200 ease-in-out px-5 py-2 mt-7 bg-sky-500 hover:bg-sky-700 rounded-md text-white select-none"
);

const newUser = ref({
  username: "",
  email: "",
  firstname: "",
  lastname: "",
  password: "",
});

const submitForm = async () => {
  const { data: responseData } = await useFetch("/api/users", {
    method: "post",
    body: {
      username: newUser.value.username,
      email: newUser.value.email,
      name: newUser.value.firstname + " " + newUser.value.lastname,
      password: newUser.value.password,
    },
  });
  newUser.value = {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  };
  switch (responseData.value) {
    case "USER_EXISTS":
      toast.warning("User with given email or username already exists");
      break;
    case "NOT_LOGGED_IN":
      toast.error("User can't added - Please login");
      break;
    case "SUCCESS":
      toast.success("User added");
      navigateTo('/admin/users');
      break;
    case "ERROR":
      toast.warning("Error");
      break;
  }
};
</script>
<template>
  <div class="flex flex-col">
    <h1 class="text-2xl select-none pb-6">Add User</h1>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col space-y-5">
        <div class="flex justify-between">
          <label :class="label">Username:</label>
          <input
            v-model="newUser.username"
            required
            :class="input"
            type="text"
          />
        </div>
        <div class="flex justify-between">
          <label :class="label">Email:</label>
          <input v-model="newUser.email" required :class="input" type="text" />
        </div>
        <div class="flex justify-between">
          <label :class="label">First Name:</label>
          <input v-model="newUser.firstname" :class="input" type="text" />
        </div>
        <div class="flex justify-between">
          <label :class="label">Last Name:</label>
          <input v-model="newUser.lastname" :class="input" type="text" />
        </div>
        <div class="flex justify-between">
          <label :class="label">Password:</label>
          <input
            v-model="newUser.password"
            required
            :class="input"
            type="password"
          />
        </div>
      </div>
      <button type="submit" :class="button">Add</button>
    </form>
  </div>
</template>
