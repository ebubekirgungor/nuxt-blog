<template>
  <main :class="main">
    <div :class="flex_col">
      <img src="/logo.svg" :class="logo" />
      <div :class="box">
        <div :class="form_padding">
          <form
            @submit.prevent="
              signIn('credentials', {
                email: email,
                username: email,
                password: password,
                callbackUrl: '/admin',
              })
            "
            :class="form"
          >
            <div>
              <label :class="label_text">{{ t("username_or_email") }}</label>
              <input type="text" v-model="email" :class="input_text" />
            </div>
            <div>
              <label :class="label_text">{{ t("password") }}</label>
              <input type="password" v-model="password" :class="input_text" />
            </div>
            <div :class="flex">
              <div :class="flex_start">
                <div :class="flex_center">
                  <input
                    type="checkbox"
                    id="remember"
                    aria-describedby="remember"
                    :class="input_checkbox"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label :class="label_checkbox" for="remember">{{
                    t("remember_me")
                  }}</label>
                </div>
              </div>
              <button type="submit" :class="button">{{ t("login") }}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const email = ref("");
const password = ref("");
definePageMeta({
  auth: {
    unauthenticatedOnly: true,
  },
  layout: "login",
});
useHead({
  title: t("login"),
});
const { signIn } = useAuth();

const main = ref("touch-pan-up h-screen bg-emerald-50");
const flex_col = ref("flex flex-col justify-center items-center");
const logo = ref(
  "select-none pointer-events-none w-[100px] h-[65px] md:w-[150px] md:h-[98px] mt-[70px] mt-[40px] md:mt-[5%]"
);
const box = ref(
  "scale-90 md:scale-100 w-full bg-white rounded-lg shadow-lg mt-[40px] md:mt-[5%] sm:max-w-md xl:p-0 select-none"
);
const form_padding = ref("p-6 space-y-4 md:space-y-6 sm:p-8");
const form = ref("flex-auto p-6 space-y-4 md:space-y-6");
const label_text = ref("block mb-2 text-zinc-600");
const input_text = ref(
  "transition duration-200 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-full p-2.5"
);
const flex = ref("flex items-center justify-between");
const flex_start = ref("flex items-start");
const flex_center = ref("flex items-center h-5");
const input_checkbox = ref(
  "transition duration-200 ease-in-out cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-sky-300"
);
const label_checkbox = ref("cursor-pointer text-zinc-600");
const button = ref(
  "transition duration-200 ease-in-out px-5 py-2 bg-sky-500 hover:bg-sky-700 rounded-md text-white"
);
</script>
