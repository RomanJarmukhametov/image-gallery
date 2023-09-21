<script setup>
definePageMeta({
  layout: "custom",
});
</script>

<template>
  <div>
    <Head>
      <Link rel="preconnect" href="https://api.unsplash.com/" />
      <Title> Favorites | Art Gallery </Title>
      <Meta
        name="description"
        content="A gallery of beautiful favorite images from Unsplash"
      />
    </Head>

    <main>
      <TagH1 class="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">Favorites</TagH1>
      <SectionGallery :isForFavoritePage="true" />
    </main>
  </div>
</template>

<style scoped></style>
