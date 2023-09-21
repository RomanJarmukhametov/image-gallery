<script setup>
import { MagnifyingGlassIcon } from "@heroicons/vue/20/solid";

// Get the current route and router instance
const route = useRoute();
const router = useRouter();

// Define emits for the component
const emit = defineEmits(["submit"]);

// Local state for the input.
const searchValue = ref("");

const handleSearch = () => {
  emit("submit", searchValue.value);
  // Clear the input value
  searchValue.value = "";
  // If current route is not the index page, navigate to the index page using push method
  if (route.path !== "/") {
    router.push("/");
  }
};

// Define props for the component
const props = defineProps({
  withPadding: {
    type: Boolean,
    default: true,
  },
});
</script>

<template>
  <div :class="withPadding ? 'py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24' : ''">
    <div class="w-full max-w-2xl mx-auto">
      <label for="search" class="sr-only">Search</label>
      <div class="relative">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <MagnifyingGlassIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          v-model="searchValue"
          id="search"
          name="search"
          class="block w-full rounded-md border-0 bg-white py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="Type and press Enter to search..."
          type="search"
          @keyup.enter="handleSearch"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
