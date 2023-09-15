<template>
  <div>
      <div
        v-if="show"
        class="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-2 rounded"
      >
        {{ message }}
      </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: "",
    };
  },
};
</script>
