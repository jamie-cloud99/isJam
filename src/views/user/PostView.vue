<template>
  <div class="pt-4 lg:pt-[30px]">
    <div class="container">
      <div class="mb-6 grid grid-cols-12 gap-2 lg:gap-6">
        <div class="col-span-12 lg:col-span-10">
          <div class="h-full border-2 p-3 lg:border-3 lg:p-6">
            <img
              class="block h-full max-h-[180px] w-full object-cover md:max-h-[500px] 2xl:max-h-[560px]"
              :src="post.imageUrl"
              :alt="post.title"
            />
          </div>
        </div>
        <div class="col-span-12 lg:col-span-2">
          <div
            v-if="post.createAt"
            class="grid h-full grid-cols-12 flex-col gap-2 lg:flex lg:gap-6"
          >
            <div class="col-span-4">
              <div
                class="border-2 px-4 py-6 text-center lg:border-3 2xl:px-10 2xl:py-8"
              >
                <p
                  class="font-Yese text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  {{ formatDate.year }}
                </p>
              </div>
            </div>
            <div class="col-span-8 flex-grow">
              <div
                class="flex h-full items-center justify-between border-2 px-6 py-3 text-center lg:flex-col lg:border-3 lg:px-8 lg:py-12 2xl:px-10"
              >
                <div
                  class="font-Yese text-[22px] leading-[25px] lg:text-3xl xl:text-4xl 2xl:text-5xl"
                >
                  <p class="">{{ formatDate.month }}</p>
                  <p class="">{{ formatDate.day }}</p>
                </div>
                <div
                  class="h-0.5 w-[50px] -rotate-[60deg] bg-primary lg:my-[45px]"
                ></div>
                <p
                  class="xl:writing-verticle font-serif font-bold leading-[18px] lg:space-y-1 lg:text-2xl 2xl:text-8"
                >
                  {{ post.postType }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="grid-cols-12 lg:grid">
        <div class="lg:col-span-8 lg:col-start-3">
          <h2
            class="mb-3 text-center font-serif text-8 font-bold tracking-wider lg:mb-8 lg:text-[40px]"
          >
            {{ post.title }}
          </h2>
        </div>
      </div>
      <div class="grid-cols-12 lg:grid">
        <div class="lg:col-span-6 lg:col-start-4">
          <ul class="mb-12 flex justify-center gap-2">
            <li class="" v-for="item in post.tag" :key="item">
              <TagComponent :tag="item" />
            </li>
          </ul>
          <p
            class="mb-4 border border-primary/70 p-4 text-stone-700 leading-7 mx-6 lg:mb-6 lg:border-2 lg:p-8"
          >
            {{ post.description }}
          </p>
        </div>
      </div>
      <div class="grid-cols-12 lg:grid">
        <div class="lg:col-span-8 lg:col-start-3">
          <div
            v-html="post.content"
            class="mb-6 p-4 lg:mb-12 lg:p-8 lg:text-lg"
          ></div>
        </div>
      </div>
      <SectionTitle :title="sections[0]" class="mb-4 lg:mb-8" />
      <ul
        class="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-y-8 lg:mb-15 lg:grid-cols-3 lg:gap-y-12"
      >
        <li class="col-span-1" v-for="item in relatedPosts" :key="item.id">
          <PostCard :post="item" hide="true"/>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, ref, watchEffect } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { useLocalDate } from "../../composables/format";



import usePostStore from "../../stores/postStore";
import TagComponent from "../../components/TagComponent.vue";
import SectionTitle from "../../components/SectionTitle.vue";
import PostCard from "../../components/PostCard.vue";

const postStore = usePostStore();
const route = useRoute();

const { fetchPost } = postStore;
const { post, relatedPosts } = storeToRefs(postStore);

const formatDate = ref({});
watchEffect(() => {
  formatDate.value = useLocalDate(post.value.createAt);
});

const id = computed(() => {
  return route.params.postId;
});

const sections = reactive([
  {
    title: "相似文章",
    engTitle: "More",
  },
]);

fetchPost(id.value);


</script>
