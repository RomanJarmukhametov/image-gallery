<script setup></script>

<template>
  <div class="h-screen flex flex-col">
    <NavigationBar :forHomePage="true" />
    <div class="flex-grow">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped></style>
