<script setup lang="ts">
import { useToast } from "vue-toastification";
const { t } = useI18n();
const { data } = useAuth();
const { data: user } = await useFetch<string | any>(
  "/api/users/" + (data!.value!.user as any).id
);
const toast = useToast();
const activeLink = useActiveLink();
activeLink.value = "posts";

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: t("add_post"),
});
const input = ref(
  "transition duration-200 ease-in-out ml-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-[250px] h-9 p-2.5"
);
const textarea = ref(
  "transition duration-200 ease-in-out ml-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-[250px] p-2.5"
);
const label = ref("select-none mt-1");
const button = ref(
  "transition duration-200 ease-in-out px-5 py-2 mt-7 bg-sky-500 hover:bg-sky-700 rounded-md text-white select-none"
);

const newPost = ref({
  name: "",
  title: "",
  content: "",
});

const submitForm = async () => {
  const { data: responseData } = await useFetch("/api/posts", {
    method: "post",
    body: {
      name: newPost.value.name,
      author: user.value.username,
      title: newPost.value.title,
      content: newPost.value.content,
      page: false,
    },
  });
  newPost.value = {
    name: "",
    title: "",
    content: "",
  };
  switch (responseData.value) {
    case "POST_EXISTS":
      toast.warning(t("POST_EXISTS"));
      break;
    case "NOT_LOGGED_IN":
      toast.error(t("post") + t("NOT_LOGGED_IN"));
      break;
    case "SUCCESS":
      toast.success(t("post") + t("SUCCESS"));
      navigateTo("/admin/posts");
      break;
    case "ERROR":
      toast.warning(t("ERROR"));
      break;
  }
};
</script>
<template>
  <div class="flex flex-col">
    <h1 class="text-2xl select-none pb-6">{{ $t("add_post") }}</h1>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col space-y-5">
        <div class="flex justify-between">
          <label :class="label">{{ $t("name") }} (URL):</label>
          <input v-model="newPost.name" required :class="input" type="text" />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ $t("title") }}:</label>
          <input v-model="newPost.title" required :class="input" type="text" />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ $t("content") }}:</label>
          <textarea
            v-model="newPost.content"
            required
            :class="textarea"
            type="text"
          ></textarea>
        </div>
      </div>
      <button type="submit" :class="button">{{ $t("add") }}</button>
    </form>
  </div>
</template>
