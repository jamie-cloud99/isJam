<template>
  <div class="pt-4 lg:pt-8">
    <div class="container">
      <SectionTitle
        data-aos="fade-in"
        :title="sections[0]"
        class="mb-6 lg:mb-8"
      />

      <div v-if="searchList.length">
        <ul
          class="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-y-8 lg:mb-15 lg:grid-cols-3 lg:gap-y-12"
        >
          <li class="col-span-1" v-for="item in searchList" :key="item.id">
            <PostCard :post="item" />
          </li>
        </ul>
      </div>
      <div v-else>
        <div class="mb-8 md:mb-12 lg:mb-15">
          <h4 class="text-center text-2xl font-medium lg:text-4xl">
            Sorry... 此關鍵字暫時沒有內容
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
import PostCard from "../../components/PostCard.vue";
import SectionTitle from "../../components/SectionTitle.vue";

const sections = reactive([
  {
    title: "搜尋結果",
    engTitle: "Search",
  },
]);

const postStore = usePostStore();
const { searchList } = storeToRefs(postStore);


</script>

<style scoped></style>
