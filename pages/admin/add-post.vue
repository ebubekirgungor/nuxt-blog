<script setup lang="ts">
import { useToast } from "vue-toastification";
const { data } = useAuth();
const { data: user } = await useFetch<string | any>(
  "/api/users/" + data!.value!.user!.id
);
const toast = useToast();

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: "Add Post",
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
      toast.warning("Post with given name already exists");
      break;
    case "NOT_LOGGED_IN":
      toast.error("Post can't added - Please login");
      break;
    case "SUCCESS":
      toast.success("Post added");
      navigateTo('/admin/posts');
      break;
    case "ERROR":
      toast.warning("Error");
      break;
  }
};
</script>
<template>
  <div class="flex flex-col">
    <h1 class="text-2xl select-none pb-6">Add Post</h1>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col space-y-5">
        <div class="flex justify-between">
          <label :class="label">Name (URL):</label>
          <input v-model="newPost.name" required :class="input" type="text" />
        </div>
        <div class="flex justify-between">
          <label :class="label">Title:</label>
          <input v-model="newPost.title" required :class="input" type="text" />
        </div>
        <div class="flex justify-between">
          <label :class="label">Content:</label>
          <textarea
            v-model="newPost.content"
            required
            :class="textarea"
            type="text"
          ></textarea>
        </div>
      </div>
      <button type="submit" :class="button">Add</button>
    </form>
  </div>
</template>
