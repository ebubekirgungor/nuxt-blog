<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useToast } from "vue-toastification";
const toast = useToast();
const route = useRoute();

const { data } = useAuth();
const activeLink = useActiveLink();
activeLink.value = "posts";

const { data: user } = await useFetch<string | any>(
  "/api/users/" + (data!.value!.user as any).id
);

interface Post {
  name: string;
  title: string;
  author: string;
}

const { data: post } = await useFetch<Array<Post> | any>(
  "/api/posts/" + route.query.post + "?type=post_by_name"
);

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: t("edit_post"),
});
const input = 
  "transition duration-200 ease-in-out ml-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-[250px] h-9 p-2.5";
const textarea = 
  "transition duration-200 ease-in-out ml-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-[250px] p-2.5";
const label = "select-none mt-1";
const button = 
  "transition duration-200 ease-in-out px-5 py-2 mt-7 bg-sky-500 hover:bg-sky-700 rounded-md text-white select-none";

const updatedPost = ref({
  name: post.value.name,
  title: post.value.title,
  content: post.value.content,
});

const submitForm = async () => {
  const { data: responseData } = await useFetch(
    "/api/posts/" + route.query.post,
    {
      method: "post",
      body: {
        name: updatedPost.value.name,
        author: user.value.username,
        title: updatedPost.value.title,
        content: updatedPost.value.content,
        page: false,
      },
    }
  );
  updatedPost.value = {
    name: "",
    title: "",
    content: "",
  };
  switch (responseData.value) {
    case "NOT_LOGGED_IN":
      toast.error(t("post") + t("NOT_LOGGED_IN_UPDATE"));
      break;
    case "SUCCESS":
      toast.success(t("post") + t("SUCCESS_UPDATE"));
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
    <h1 class="text-2xl select-none pb-6">{{ t("edit_post") }}</h1>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col space-y-5">
        <div class="flex justify-between">
          <label :class="label">{{ t("name") }} (URL):</label>
          <input
            v-model="updatedPost.name"
            required
            :class="input"
            type="text"
          />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ t("title") }}:</label>
          <input
            v-model="updatedPost.title"
            required
            :class="input"
            type="text"
          />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ t("content") }}:</label>
          <textarea
            v-model="updatedPost.content"
            required
            :class="textarea"
            type="text"
          ></textarea>
        </div>
      </div>
      <button type="submit" :class="button">{{ t("update") }}</button>
    </form>
  </div>
</template>
