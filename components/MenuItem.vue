<script setup>
import { HeartIcon } from "@heroicons/vue/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

//Define props for the component
const props = defineProps({
  withSearch: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div v-if="withSearch">
    <div class="flex items-center space-x-2 px-3">
      <MagnifyingGlassIcon class="h-6 w-6 text-white" />
      <span
        class="hidden md:inline-block text-lg font-normal tracking-normal text-white"
        >Search</span
      >
    </div>
  </div>

  <div v-else>
    <div class="flex items-center space-x-2 px-3">
      <HeartIcon class="h-6 w-6 text-white" />
      <span
        class="hidden md:inline-block text-lg font-normal tracking-normal text-white"
        >Favorites</span
      >
    </div>
  </div>
</template>

<style scoped></style>
