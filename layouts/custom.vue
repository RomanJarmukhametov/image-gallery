<script setup></script>

<template>
  <div class="h-screen flex flex-col">
    <NavigationBar :forHomePage="false" />
    <div class="flex-grow">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
