<template>
  <main class="pt-8">
    <div class="container">
      <div
        class="mb-8 h-[350px] w-full bg-[url('../assets/images/post/03.jpg')] bg-cover bg-center text-white lg:mb-12 lg:h-[518px]"
      >
        <div
          class="flex h-full flex-col bg-gradient-to-t from-black/40 to-white/0"
        >
          <p class="pl-10 pt-4 font-Yese text-8 lg:pl-12 lg:pt-12 lg:text-6xl">
            {{ useLocalDate(today).fullDate }}
          </p>
          <div class="mb-6 mt-auto grid grid-cols-12 gap-6">
            <div class="col-span-8 col-start-3">
              <h1
                class="mb-4 text-center font-serif text-lg font-bold tracking-wider lg:text-2xl"
              >
                對於彼此的日常生活，我們皆隻字未提，宛如初次相遇的人一樣，
                單純共享了那段時光。
              </h1>
              <p class="hidden px-3 text-right text-lg tracking-wide lg:block">
                —— 愛情的理解
              </p>
            </div>
          </div>
        </div>
      </div>
      <ul class="mb-8 grid grid-cols-3 gap-6 lg:mb-12 lg:grid-cols-6">
        <li class="col-span-1" v-for="item in categoryList" :key="item.title">
          <RouterLink to="/posts" @click="selectCategory(item.code)"
            class="flex aspect-square flex-col items-center justify-center border-2 hover:text-secondary-dark"
          >
            <i
              class="fa-solid mb-2 block text-[40px] md:mb-3 xl:text-[80px]"
              :class="item.icon"
            ></i>
            <h3 class="text-center font-serif font-bold md:text-xl lg:text-2xl">
              {{ item.title }}
            </h3>
          </RouterLink>
        </li>
        <li class="col-span-1">
          <RouterLink to="/posts" @click="selectCategory('all')"
            class="flex aspect-square items-center justify-center border-2 border-primary bg-primary text-secondary hover:bg-gradient-to-t from-secondary to-white hover:text-primary"
          >
            <h3
              class="text-center font-serif text-2xl font-bold md:text-3xl xl:text-5xl"
            >
              探索<br />更多
            </h3>
          </RouterLink>
        </li>
      </ul>
      <SectionTitle :title="sections[0]" class="mb-6 lg:mb-8" />
      <ul
        class="mb-8 grid grid-cols-1 gap-6 md:mb-12 md:grid-cols-2 md:gap-y-8 lg:mb-15 lg:grid-cols-3 lg:gap-y-12"
      >
        <li class="col-span-1" v-for="item in recentPosts" :key="item.id">
          <PostCard :post="item" />
        </li>
      </ul>
      <SectionTitle :title="sections[1]" class="mb-6 lg:mb-8" />
      <div class="mb-8 grid grid-cols-1 gap-x-6 gap-y-3 lg:grid-cols-12">
        <div class="col-span-1 lg:col-span-7">
          <img
            :src="onlineEvent.imageUrl"
            :alt="onlineEvent.title"
            class="mb-3 block h-[158px] w-full object-cover object-[center_30%] md:min-h-[240px] lg:mb-0 lg:min-h-[325px]"
          />
        </div>
        <div class="col-span-1 lg:col-span-5">
          <h3 class="mb-2 font-serif text-lg font-bold lg:mb-4 lg:text-8">
            {{ onlineEvent.title }}
          </h3>
          <ul class="mb-3 flex gap-x-2 lg:mb-8">
            <li v-for="item in onlineEvent.tags" :key="item">
              <TagComponent :tag="item" />
            </li>
          </ul>
          <p
            v-html="onlineEvent.description"
            class="mb-3 line-clamp-[8] lg:mb-8 lg:line-clamp-5"
          ></p>
          <a :href="onlineEvent.link" class="btn w-full text-center" target="_blank">
            查看詳情 <span class="ml-1">»</span>
          </a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { reactive } from "vue";
import { storeToRefs } from "pinia";

import PostCard from "../../components/PostCard.vue";
import TagComponent from "../../components/TagComponent.vue";
import SectionTitle from "../../components/SectionTitle.vue";

import { useLocalDate } from "../../composables/format";
import usePostStore from "../../stores/postStore";

const postStore = usePostStore();
const { today, categoryList, recentPosts } = storeToRefs(postStore);
const { fetchPostsAll, clearPost, selectCategory } = postStore;

const onlineEvent = reactive({
  title: "Consolation To You",
  subtitle: "CNEMA",
  imageUrl:
    "https://images.genius.com/557e1bc2c39bab430fd970005e39f2d9.1000x1000x1.jpg",
  description:
    "樂團 CNEMA 的第二章單曲〈最溫暖的安慰〉，以其溫柔帶有力量的雙主唱，和如同電影般徐徐展開的編曲，為人們帶來慰藉，彷彿是一雙溫柔的手，輕輕地撫摸著我們內心最柔軟的地方。如果你也正在為生活苦惱和困惑，不妨從這首歌中獲取那份溫暖力量，重新振作起來。",
  tags: ["韓樂", "CNEMA", "SuperBand2"],
  link: "https://youtu.be/KksdrsTzCME",
});
const contactList = reactive([
  {
    icon: "icofont-ui-email",
    title: "email",
    content: "7tao.event@gmail.com",
    link: "mailto:7tao.event@gmail.com",
  },
  {
    icon: "icofont-phone",
    title: "phone",
    content: "09123123123",
    link: "+8869123123123",
  },
  {
    icon: "icofont-facebook",
    title: "facebook",
    content: "7TAO七逃",
    link: "",
  },
]);

const sections = reactive([
  {
    title: "近期文章",
    engTitle: "Recent",
  },
  {
    title: "本日選曲",
    engTitle: "Playlist",
  },
]);

clearPost()
fetchPostsAll();

</script>
