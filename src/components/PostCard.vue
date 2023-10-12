<template>
  <div @click="$router.push(`/posts/${post.id}?pageTitle=${post.title}`)" class="cursor-pointer flex flex-col h-full">
    <p v-if="!hide" class="font-Yese mb-2 text-[32px] lg:mb-3 xl:text-[48px]">
      {{ useLocalDate(post.createAt).fullDate }}
    </p>
    <hr v-if="!hide" class="mb-4 border-b-3 lg:mb-3" />
    <img
      class="mb-2 block h-[210px] w-full object-cover lg:mb-3 lg:h-[255px]"
      :src="post.imageUrl"
      :alt="post.title"
      referrerPolicy="no-referrer"
    />
    <h3 class="mb-2 font-serif text-lg lg:mb-3 lg:text-2xl line-clamp-2">
      {{ post.title }}
    </h3>
    <p class="mb-4 line-clamp-3 md:min-h-[72px] flex-grow">{{ post.description }}</p>
    <div class="flex items-center justify-between border-y-2">
      <RouterLink to="/posts" @click.stop="selectCategory(categoryCode)" class=" py-2 font-serif font-bold block hover:underline">
        <img src="/images/sparkler.png" alt="sparkler" class="w-6 h-6 inline-block pb-1">
        {{ categoryName }}</RouterLink>
      <RouterLink to="#" class="relative block py-2 font-bold link-spot"
        >查看內容 <span class="ml-1">»</span>
        <span class="absolute w-0 h-0 top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary -z-10 hide transition-all duration-300"></span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useLocalDate } from "../composables/format"
import usePostStore from "../stores/postStore";
import { computed, toRefs } from 'vue'

const props = defineProps({
  post: {
    type: Object,
    default: () => ({}),
  },
  hide: {
    type: Boolean,
    default: false
  }
});

const postStore = usePostStore()
const { categoryList } = storeToRefs(postStore)
const { selectCategory } = postStore

const { post } = toRefs(props)

const categoryName = computed(() => {
  return categoryList.value.find(item => item.code === post.value.category).title
})

const categoryCode = computed(() => {
  return categoryList.value.find(item => item.code === post.value.category).code
})



</script>


<style>
.link-spot:hover .hide {
  width: 28px;
  height: 28px;
  display: block;
}

</style>
