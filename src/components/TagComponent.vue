<template>
  <label class="block">
    <input type="checkbox" class="hidden checkbox" />
    <p
      class="check-item cursor-pointer border border-l-4 py-1 pl-3 pr-4 font-serif text-sm font-bold transition-all duration-500 hover:border-l-secondary hover:bg-primary hover:text-white lg:pl-5 lg:pr-6 lg:text-base"
    >
      {{ props.tag }}
    </p>
  </label>
  <div></div>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: "",
  },
});

</script>

<style>
.checkbox:checked + .check-item {
  @apply text-white bg-primary border-l-secondary
}


</style>
