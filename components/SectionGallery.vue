<script setup>
// Define component props
const props = defineProps({
  isForFavoritePage: {
    type: Boolean,
    default: false,
  },
});

// Get the shared state
const searchQuery = useState("searchQuery");

// Create a ref for the images
const images = ref([]);

// Object to track which images have loaded
const imageLoaded = ref({});

// Function to mark an image as loaded
const setImageAsLoaded = (imageId) => {
  imageLoaded.value[imageId] = true;
};

// --- Utility Functions ---
const loadImages = async () => {
  try {
    if (props.isForFavoritePage) {
      const favoriteSlugs = JSON.parse(
        localStorage.getItem("favoriteImages") || "[]"
      );
      images.value = await fetchImagesBySlugs(favoriteSlugs);
    } else {
      // Use the shared search query to fetch images
      images.value = await fetchImages(searchQuery.value);
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
};

// Load images on component mount
onMounted(loadImages);

// Re-fetch images whenever the search query changes
// This may not be necessary for the favorites page, but it won't hurt to keep it here for consistency
watch(searchQuery, loadImages, { immediate: false });
</script>

<template>
  <section class="bg-white">
    <Container class="overflow-hidden py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8"
      >
        <NuxtLink
          v-for="image in images"
          :key="image.id"
          :to="`/image/${image.slug}`"
          class="group text-sm"
        >
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
          >
          <!-- Loader using Tailwind classes. Shown by default until the image is loaded -->
            <div
              v-if="!imageLoaded[image.id]"
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-t-2 border-gray-200 border-solid rounded-full animate-spin"
            ></div>
            <!-- Image. The load event will call setImageAsLoaded to hide the loader -->
            <NuxtImg
              :src="image.imageSrc"
              :alt="image.imageAlt"
              class="h-full w-full object-cover object-center"
              format="webp"
              @load="setImageAsLoaded(image.id)"
            />
          </div>
        </NuxtLink>
      </div>
    </Container>
  </section>
</template>

