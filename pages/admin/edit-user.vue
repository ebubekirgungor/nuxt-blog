<script setup lang="ts">
import { useToast } from "vue-toastification";
const { t } = useI18n();
const toast = useToast();
const route = useRoute();
const { data } = useAuth();
const activeLink = useActiveLink();

if (
  route.name == "admin-edit-user" &&
  route.query.id == (data!.value!.user as any).id
) {
  activeLink.value = "profile";
} else {
  activeLink.value = "users";
}

const id = route.query.id;

interface User {
  username: string;
  email: string;
  name: string;
}

const { data: user } = await useFetch<Array<User> | any>(
  "/api/users/" + route.query.id
);

watch(
  () => route.query.id,
  () => window.location.reload()
);

let title: string;

if ((data!.value!.user as any).id == route.query.id) title = t("profile");
else title = t("edit_user");

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: title,
});
const input = ref(
  "transition duration-200 ease-in-out ml-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-[250px] h-9 p-2.5"
);
const label = ref("select-none mt-1");
const button = ref(
  "transition duration-200 ease-in-out px-5 py-2 mt-7 bg-sky-500 hover:bg-sky-700 rounded-md text-white select-none"
);

const updatedUser = ref({
  username: user.value.username,
  email: user.value.email,
  firstname: user.value.name?.split(" ")[0],
  lastname: user.value.name?.split(" ")[1],
  password: "",
});

const submitForm = async () => {
  const { data: responseData } = await useFetch(
    "/api/users/" + route.query.id,
    {
      method: "post",
      body: {
        username: updatedUser.value.username,
        email: updatedUser.value.email,
        name: updatedUser.value.firstname + " " + updatedUser.value.lastname,
        password: updatedUser.value.password,
      },
    }
  );
  updatedUser.value = {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  };
  switch (responseData.value) {
    case "NOT_LOGGED_IN":
      toast.error(t("user") + t("NOT_LOGGED_IN_UPDATE"));
      break;
    case "SUCCESS":
      toast.success(t("user") + t("SUCCESS_UPDATE"));
      navigateTo("/admin/users");
      break;
    case "ERROR":
      toast.warning(t("ERROR"));
      break;
  }
};
</script>
<template>
  <div class="flex flex-col">
    <h1 class="text-2xl select-none pb-6">{{ title }}</h1>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col space-y-5">
        <div class="flex justify-between">
          <label :class="label">{{ $t("username") }}:</label>
          <input
            v-model="updatedUser.username"
            required
            :class="input"
            type="text"
          />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ $t("email") }}:</label>
          <input
            v-model="updatedUser.email"
            required
            :class="input"
            type="text"
          />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ $t("first_name") }}:</label>
          <input v-model="updatedUser.firstname" :class="input" type="text" />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ $t("last_name") }}:</label>
          <input v-model="updatedUser.lastname" :class="input" type="text" />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ $t("new_password") }}:</label>
          <input
            v-model="updatedUser.password"
            required
            :class="input"
            type="password"
          />
        </div>
      </div>
      <button type="submit" :class="button">{{ $t("update") }}</button>
    </form>
  </div>
</template>
