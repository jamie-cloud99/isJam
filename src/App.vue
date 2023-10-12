<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <RouterView />

  <div>
    <div class="hidden list-inside list-decimal space-y-6 indent-4"></div>
    <div
      class="ml-2 hidden list-disc indent-2 leading-relaxed tracking-wide text-primary/80"
    ></div>
    <div class="text-secondary-dark"></div>
  </div>
</template>
