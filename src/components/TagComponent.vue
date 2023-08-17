<template>
  <div class="border border-l-4 py-1 pl-3 pr-4 transition-all duration-500 hover:text-white hover:bg-primary hover:border-l-secondary cursor-pointer  lg:pl-5 lg:pr-6">
    <p class="font-serif text-sm font-bold lg:text-base">{{ props.tag }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: "",
  },
});
</script>
