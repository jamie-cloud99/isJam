<template>
  <div class="pt-4 lg:pt-8">
    <div class="container">
      <SectionTitle
        data-aos="fade-in"
        :title="sections[0]"
        class="mb-6 lg:mb-8"
      />

      <ul class="mb-8 grid grid-cols-3 gap-y-4 md:grid-cols-6 lg:mb-12 lg:flex">
        <li class="col-span-1 mx-auto lg:mx-0">
          <button
            type="button"
            class="block border-b-2 px-6 py-3 transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:border-0 lg:w-40"
            :class="{ 'category-selected': categorySelected.code === 'all' }"
            @click="selectCategory('all')"
          >
            <h3 class="text-center font-serif font-bold md:text-xl lg:text-2xl">
              全部
            </h3>
          </button>
        </li>
        <li
          class="col-span-1 mx-auto lg:mx-0"
          v-for="item in categoryList"
          :key="item.title"
        >
          <button
            type="button"
            class="block border-b-2 px-6 py-3 transition-transform duration-300 hover:-translate-y-1 hover:scale-105 hover:border-0 lg:w-40"
            :class="{
              'category-selected': item.code === categorySelected.code,
            }"
            @click="selectCategory(item.code)"
          >
            <h3 class="text-center font-serif font-bold md:text-xl lg:text-2xl">
              {{ item.title }}
            </h3>
          </button>
        </li>
      </ul>
      <ul class="mb-6 flex flex-wrap gap-x-4 gap-y-2">
        <li v-for="tag in tempTagList.slice(0, 10)" :key="tag">
          <TagComponent :tag="tag" />
        </li>
      </ul>

      <div v-if="tempPostList.length">
        <ul
          class="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-y-8 lg:mb-15 lg:grid-cols-3 lg:gap-y-12"
        >
          <li class="col-span-1" v-for="item in tempPostList" :key="item.id">
            <PostCard :post="item" />
          </li>
        </ul>
      </div>
      <div v-else>
        <div class="mb-8 md:mb-12 lg:mb-15">
          <h4 class="text-center text-2xl font-medium lg:text-4xl">
            Sorry... 此分類暫時沒有內容
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";
import usePostStore from "../../stores/postStore";
import SectionTitle from "../../components/SectionTitle.vue";
import PostCard from "../../components/PostCard.vue";
import TagComponent from "../../components/TagComponent.vue";

const postStore = usePostStore();
const {
  categoryList,
  categorySelected,
  tempPostList,
  tempTagList,
  tagListSelected,
} = storeToRefs(postStore);
const { selectCategory, fetchPostsAll } = postStore;

const sections = reactive([
  {
    title: "文章列表",
    engTitle: "Posts",
  },
]);

fetchPostsAll();
</script>

<style>
.category-selected {
  @apply border-b-2 border-r-2 border-primary bg-primary text-secondary transition-all duration-500;
}
</style>
