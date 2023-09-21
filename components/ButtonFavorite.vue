<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";

// Define props for the component
const props = defineProps({
  isFavorite: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <button
    type="button"
    class="rounded-md p-2.5 bg-white text-gray-900 transform transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:shadow-lg"
    aria-label="Favorite"
  >
    <HeartIcon :class="isFavorite ? 'h-6 w-6 text-red-500' : 'h-6 w-6'" />
  </button>
</template>

<style scoped></style>
