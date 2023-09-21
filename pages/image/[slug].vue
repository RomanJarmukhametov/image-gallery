<script setup>
// Define the page meta for this page
definePageMeta({
  layout: "custom",
});

// Object to track which images have loaded
const imageLoaded = ref({});

// Function to mark an image as loaded
const onImageLoad = () => {
  imageLoaded.value = true;
};

// Get the current route
const route = useRoute();

// Get the slug from the current route
const currentSlug = route.params.slug;

// Create a ref for the current image
const currentImage = ref(null);

// Ref to determine whether the current image is a favorite
const isFavorite = ref(false);

// --- Utility Functions ---

// Fetch favorite images from localStorage
function getFavoriteImagesFromLocalStorage() {
  try {
    return JSON.parse(localStorage.getItem("favoriteImages") || "[]");
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
}

// Update favorite images in localStorage
function updateFavoriteImagesInLocalStorage(favoriteImages) {
  try {
    localStorage.setItem("favoriteImages", JSON.stringify(favoriteImages));
  } catch (error) {
    console.error("Error updating localStorage:", error);
  }
}

// --- Component Logic ---

// Toggle the favorite status of the current image
const toggleFavorite = () => {
  const favoriteImages = getFavoriteImagesFromLocalStorage();

  if (!favoriteImages.includes(currentSlug)) {
    favoriteImages.push(currentSlug);
    isFavorite.value = true;
  } else {
    const index = favoriteImages.indexOf(currentSlug);
    if (index > -1) {
      favoriteImages.splice(index, 1);
    }
    isFavorite.value = false;
  }
  updateFavoriteImagesInLocalStorage(favoriteImages);
};

// Lifecycle hook: On component mounted
onMounted(async () => {
  // Ensure the favoriteImages key exists in localStorage
  if (!localStorage.getItem("favoriteImages")) {
    updateFavoriteImagesInLocalStorage([]);
  }

  // Check if the current image slug is among the favorites and set the isFavorite ref accordingly
  const favoriteImages = getFavoriteImagesFromLocalStorage();
  isFavorite.value = favoriteImages.includes(currentSlug);

  // Fetch the current image's details
  try {
    currentImage.value = await fetchImageBySlug(currentSlug);
  } catch (error) {
    console.error("Error fetching the image:", error);
    return;
  }
});
</script>

<template>
  <div>
    <Head v-if="currentImage">
      <Link rel="preconnect" href="https://api.unsplash.com/" />
      <Title> {{ currentImage.title }} | Art Gallery </Title>
      <Meta
        name="description"
        content="A gallery of beautiful art from Unsplash"
      />
    </Head>

    <main>
      <section v-if="currentImage">
        <!-- Background Image Layer -->
        <div
          class="absolute inset-x-0 top-0 h-3/4 bg-cover bg-center"
          :style="{
            backgroundImage: `url(${currentImage.imageSrc})`,
            filter: 'blur(4px) brightness(50%)',
            zIndex: 10,
          }"
        ></div>

        <!-- Content Layer -->
        <div class="relative" style="z-index: 20">
          <Container
            class="flex items-center justify-between py-10 relative z-10"
          >
            <div>
              <div class="mt-10 flex items-center gap-x-6">
                <NuxtImg
                  class="h-14 w-14 rounded-lg bg-gray-50 border-[1px] border-gray-200"
                  :src="currentImage.authorAvatar"
                  :alt="currentImage.authorName"
                  format="webp"
                />
                <div class="text-sm leading-6">
                  <div class="font-semibold text-gray-200">
                    {{ currentImage.authorName }}
                  </div>
                  <NuxtLink
                    v-if="currentImage.authorInstagramProfile"
                    target="_blank"
                    class="mt-0.5 text-gray-300 hover:text-gray-400"
                    :to="`https://instagram.com/${currentImage.authorInstagramProfile}`"
                    >@{{ currentImage.authorInstagramProfile }}
                  </NuxtLink>
                  <div class="mt-0.5 text-gray-300" v-else>
                    No Instagram Profile
                  </div>
                </div>
              </div>
            </div>

            <!-- Buttons wrapper -->
            <div class="flex items-center gap-x-4">
              <ButtonFavorite
                :isFavorite="isFavorite"
                @click="toggleFavorite"
              />

              <ButtonDownload
                :downloadLink="currentImage.downloadLink"
                target="_blank"
              />
            </div>
          </Container>

          <Container class="relative z-10">
            <!-- Loader using Tailwind classes. Shown by default until the image is loaded -->
            <div
              v-if="!imageLoaded"
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-t-2 border-gray-200 border-solid rounded-full animate-spin"
            ></div>
            <NuxtImg
              class="rounded-lg shadow-md mx-auto h-[744px] w-full object-cover object-center"
              :src="currentImage.imageSrc"
              :alt="currentImage.imageAlt"
              format="webp"
              width="1482"
              height="744"
              @load="onImageLoad"
            />
          </Container>
        </div>
      </section>
    </main>
  </div>
</template>
