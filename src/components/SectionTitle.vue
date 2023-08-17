<template>
  <div
    class="flex items-center justify-between border-2 px-3 py-4  lg:px-8 lg:py-6"
  >
    <span class="font-Yese md:text-16 text-2xl uppercase">{{ props.title.engTitle }}</span>
    <h2 class="md:text-8 font-serif font-bold">{{ props.title.title }}</h2>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: Object,
    default: () => ({})
  }
})

</script>
