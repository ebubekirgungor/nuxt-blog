<script setup lang="ts">
import { useToast } from "vue-toastification";
const toast = useToast();

interface Option {
  value: string;
}

const { data: blog_title } = await useFetch<Option | any>(
  "/api/options/blog_title"
);

definePageMeta({
  layout: "admin",
  middleware: "auth",
});
useHead({
  title: "Settings",
});

const input = ref(
  "transition duration-200 ease-in-out ml-20 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-[250px] h-9 p-2.5"
);
const label = ref("select-none mt-1");
const button = ref(
  "transition duration-200 ease-in-out px-5 py-2 mt-7 bg-sky-500 hover:bg-sky-700 rounded-md text-white select-none disabled:bg-sky-300 disabled:pointer-events-none"
);

const updatedOption = ref({
  value: blog_title.value.value,
});

const input_changed = () => {
  if (updatedOption.value.value != blog_title.value.value)
    button_disabled.value = false;
  else button_disabled.value = true;
};

const button_disabled = ref(true);

const submitForm = async () => {
  const { data: responseData } = await useFetch("/api/options", {
    method: "post",
    body: {
      value: updatedOption.value.value,
    },
  });
  switch (responseData.value) {
    case "NOT_LOGGED_IN":
      toast.error("Settings can't updated - Please login");
      break;
    case "SUCCESS":
      toast.success("Settings updated");
      break;
    case "ERROR":
      toast.warning("Error");
      break;
  }
};
</script>
<template>
  <div class="flex flex-col">
    <h1 class="text-2xl select-none pb-6">Settings</h1>
    <form @submit.prevent="submitForm">
      <div class="flex flex-col space-y-5">
        <div class="flex justify-between">
          <label :class="label">Title:</label>
          <input
            v-model="updatedOption.value"
            required
            :class="input"
            type="text"
            @input="input_changed"
          />
        </div>
      </div>
      <button :disabled="button_disabled" type="submit" :class="button">
        Update
      </button>
    </form>
  </div>
</template>
