<template>
  <ul class="grid grid-cols-12 gap-x-2 gap-y-11 md:gap-6">
    <li
      v-for="photo in albums"
      :key="photo.title"
      class="col-span-10 col-start-2 md:col-span-6 xl:col-span-3"
    >
      <div class="relative border-2 p-3 pb-8" :class="photo.rotation">
        <div
          class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 -rotate-3 bg-white px-4 py-2"
        >
          {{ photo.tag }}
        </div>
        <img
          :src="$format.getImageUrl(photo.imgPath)"
          :alt="photo.title"
          class="mb-3 aspect-square object-cover"
        />
        <h3 class="font-serif text-lg font-bold">{{ photo.title }}</h3>
      </div>
    </li>
  </ul>
</template>

<script setup>
import { reactive } from "vue";

const albums = reactive([
  {
    tag: "社群活動",
    imgPath: "album/01.jpg",
    title: "無聲派對-閉閉嘴dancing",
    rotate: 0,
  },
  {
    tag: "藝文活動",
    imgPath: "album/02.jpg",
    title: "拯救老店大作戰",
    rotate: 2,
  },
  {
    tag: "自我覺察",
    imgPath: "album/03.jpg",
    title: "內觀修行-部落篇",
    rotate: -2,
  },
  {
    tag: "聯誼活動",
    imgPath: "album/04.jpg",
    title: "賞櫻野餐",
    rotate: 2,
  },
]);

const getRotationClass = () => {
  albums.forEach((item) => {
    item.rotation =
      item.rotate >= 0 ? `rotate-${item.rotate}` : `-rotate-${-item.rotate}`;
  });
};

getRotationClass();
</script>
