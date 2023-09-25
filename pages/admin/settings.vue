<script setup lang="ts">
import { useToast } from "vue-toastification";
import { useTitle } from "@vueuse/core";
const { t, locale } = useI18n();
const toast = useToast();

interface Option {
  value: string;
}

const { data: blog_title } = await useFetch<Option | any>(
  "/api/options/blog_title"
);

const { data: currentlang } = await useFetch<Option | any>("/api/options/lang");

const languages = ["en", "tr"];

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: t("settings"),
});

const input = ref(
  "transition duration-200 ease-in-out ml-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-[250px] h-9 p-2.5"
);
const select = ref(
  "transition duration-200 ease-in-out ml-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-[250px] h-9"
);
const label = ref("select-none mt-1");
const button = ref(
  "transition duration-200 ease-in-out px-5 py-2 mt-7 bg-sky-500 hover:bg-sky-700 rounded-md text-white select-none disabled:bg-sky-300 disabled:pointer-events-none"
);

const updatedBlog = ref({
  value: blog_title.value.value,
});

const updatedLang = ref(currentlang.value.value);

const input_changed = () => {
  if (updatedBlog.value.value != blog_title.value.value)
    button_disabled.value = false;
  else if (updatedLang.value != currentlang.value.value)
    button_disabled.value = false;
  else button_disabled.value = true;
};

const select_changed = () => {
  if (updatedLang.value != currentlang.value.value)
    button_disabled.value = false;
  else if (updatedBlog.value.value != blog_title.value.value)
    button_disabled.value = false;
  else button_disabled.value = true;
};

const button_disabled = ref(true);

const submitForm = async () => {
  const { data: responseData } = await useFetch("/api/options", {
    method: "post",
    body: [
      {
        option: "blog_title",
        value: updatedBlog.value.value,
      },
      {
        option: "lang",
        value: updatedLang.value,
      },
    ],
  });
  switch (responseData.value) {
    case "NOT_LOGGED_IN":
      toast.error(t("settings") + t("NOT_LOGGED_IN_UPDATE"));
      break;
    case "SUCCESS":
      locale.value = updatedLang.value;
      toast.success(t("settings") + t("SUCCESS_UPDATE"));
      blog_title.value.value = updatedBlog.value.value;
      currentlang.value.value = updatedLang.value;
      button_disabled.value = true;
      useTitle(t("settings"));
      break;
    case "ERROR":
      toast.warning(t("ERROR"));
      break;
  }
};
</script>
<template>
  <div class="flex flex-col">
    <h1 class="text-2xl select-none pb-6">{{ $t("settings") }}</h1>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col space-y-5">
        <div class="flex justify-between">
          <label :class="label">{{ $t("title") }}:</label>
          <input
            v-model="updatedBlog.value"
            required
            :class="input"
            type="text"
            @input="input_changed"
          />
        </div>
        <div class="flex justify-between">
          <label :class="label">{{ $t("language") }}:</label>
          <select
            :class="select"
            @change="select_changed"
            v-model="updatedLang"
          >
            <option v-for="lang in languages" :value="lang">
              {{ $t(lang) }}
            </option>
          </select>
        </div>
      </div>
      <button :disabled="button_disabled" type="submit" :class="button">
        {{ $t("update") }}
      </button>
    </form>
  </div>
</template>
