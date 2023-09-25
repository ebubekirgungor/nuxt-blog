<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
import { useToast } from "vue-toastification";
const { data } = useAuth();
const route = useRoute();
const { data: user } = await useFetch<string | any>(
  "/api/users/" + (data!.value!.user as any).id
);

const toast = useToast();
const activeLink = useActiveLink();
activeLink.value = "pages";

interface Page {
  name: string;
  title: string;
  author: string;
}

const { data: page } = await useFetch<Array<Page> | any>(
  "/api/posts/" + route.query.page + "?type=page"
);

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: t("edit_page"),
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

const updatedPage = ref({
  name: page.value.name,
  title: page.value.title,
  content: page.value.content,
});

const submitForm = async () => {
  const { data: responseData } = await useFetch(
    "/api/posts/" + route.query.page,
    {
      method: "post",
      body: {
        name: updatedPage.value.name,
        author: user.value.username,
        title: updatedPage.value.title,
        content: updatedPage.value.content,
        page: true,
      },
    }
  );
  updatedPage.value = {
    name: "",
    title: "",
    content: "",
  };
  switch (responseData.value) {
    case "NOT_LOGGED_IN":
      toast.error(t("page") + t("NOT_LOGGED_IN_UPDATE"));
      break;
    case "SUCCESS":
      toast.success(t("page") + t("SUCCESS_UPDATE"));
      navigateTo("/admin/pages");
      break;
    case "ERROR":
      toast.warning(t("ERROR"));
      break;
  }
};
</script>
<template>
  <div class="flex flex-col">
    <h1 class="text-2xl select-none pb-6">{{ t("edit_page") }}</h1>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col space-y-5">
        <div class="flex justify-between">
          <label :class="label">{{ t("name") }} (URL):</label>
          <input
            v-model="updatedPage.name"
            required
            :class="input"
            type="text"
          />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ t("title") }}:</label>
          <input
            v-model="updatedPage.title"
            required
            :class="input"
            type="text"
          />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ t("content") }}:</label>
          <textarea
            v-model="updatedPage.content"
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
