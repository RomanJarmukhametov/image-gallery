<script setup>
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";

// Define props for the component
const props = defineProps({
  downloadLink: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    :to="downloadLink"
    class="flex items-center space-x-2 rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm bg-[#FFF200] text-gray-900 transform transition-shadow duration-300 hover:scale-105 hover:shadow-lg hover:bg-indigo-600 hover:text-white"
    aria-label="Download image"
  >
    <ArrowDownTrayIcon class="h-6 w-6" />
    <span class="hidden md:inline-block text-lg font-normal tracking-normal"
      >Download</span
    >
</NuxtLink>
</template>

<style scoped></style>
