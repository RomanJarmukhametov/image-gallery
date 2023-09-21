<script setup>
// Define props for the component
const { forHomePage } = defineProps({
  forHomePage: {
    type: Boolean,
    default: true,
  },
});

// Create a local reactive variable initialized with the value of the prop
const isHomePage = ref(forHomePage);

// Reactive variable to determine whether to show the search bar
const showSearch = ref(false);

// Toggle the showSearch state
const showSearchBar = () => {
  showSearch.value = true;
};

// Hide the search bar on submit
const hideSearchBarOnSubmit = () => {
  showSearch.value = false;
};

// Define a reactive variable to store the search query
const searchQuery = useState("searchQuery", () => "art");
const updateQuery = (newQuery) => {
  searchQuery.value = newQuery;
};
</script>

<template>
  <nav class="z-30 relative">
    <div class="bg-black">
      <Container class="p-4 flex items-center justify-between text-white">
        <div>
          <NuxtLink to="/">
            <NuxtImg
              src="/images/logo.svg"
              alt="Logo"
              width="192"
              height="72"
            />
          </NuxtLink>
        </div>

        <div class="flex items-center">
          <MenuItem
            :withSearch="true"
            v-if="!isHomePage && !showSearch"
            @click="showSearchBar"
            v-motion-pop
          />

          <!-- Show FormSearch if showSearch is true -->
          <FormSearch
            v-if="showSearch"
            :withPadding="false"
            @submit="
              (query) => {
                updateQuery(query);
                hideSearchBarOnSubmit();
              }
            "
            v-motion-pop
          />

          <NuxtLink to="/favorites">
            <MenuItem class="nav-link" />
          </NuxtLink>
        </div>
      </Container>
    </div>

    <!-- Section with a Search bar which is shown for Homepage and hidden for Favorites page -->
    <div
      v-if="isHomePage"
      class="bg-cover bg-center bg-no-repeat"
      style="background-image: url('/images/background.jpeg')"
    >
      <Container>
        <!-- Listen to the 'submit' event from the FormSearch component -->
        <FormSearch @submit="updateQuery" />
      </Container>
    </div>
  </nav>
</template>

<style scoped></style>
