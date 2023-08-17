<template>
  <Vue3Marquee :clone="true">
    <span
      v-for="i in 5"
      :key="'i' + i"
      class="lg:text-8 bg-primary py-4 font-serif font-bold tracking-widest text-secondary lg:py-6"
      >ALBUMS・活動集錦・</span
    >
  </Vue3Marquee>
</template>

<script setup>
import { Vue3Marquee } from "vue3-marquee";
</script>
