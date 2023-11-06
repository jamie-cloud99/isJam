<template>
  <label class="block">
    <input
      type="checkbox"
      class="checkbox hidden"
      v-model="tagsSelectedObj[tag]"
      @change="updateTagsSelected"
    />
    <p
      class="check-item cursor-pointer border border-l-4 py-1 pl-3 pr-4 font-serif text-sm font-bold transition-all duration-500 hover:border-l-secondary hover:bg-primary hover:text-white lg:pl-5 lg:pr-6 lg:text-base"
    >
      {{ tag }}
    </p>
  </label>
  <div></div>
</template>

<script setup>
import { toRefs } from "vue";
import usePostStore from "@/stores/postStore";
import { storeToRefs } from "pinia";

const props = defineProps({
  tag: {
    type: String,
    default: "",
  },
});

const { tag } = toRefs(props);
const postStore = usePostStore();
const { tagsSelectedObj } = storeToRefs(postStore);
const { updateTagsSelected } = postStore;
</script>

<style>
.checkbox:checked + .check-item {
  @apply border-l-secondary bg-primary text-white;
}
</style>
