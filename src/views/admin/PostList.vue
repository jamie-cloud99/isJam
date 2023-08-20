<template>
  <div class="mb-6 flex items-center justify-between border-b-2 pb-1 lg:mb-8">
    <h1 class="font-serif text-2xl font-bold lg:text-8">管理文章</h1>
    <button class="btn py-2 lg:px-8 lg:py-4" @click="openEditor(true)">
      新增
    </button>
  </div>

  <ul>
    <li
      class="items-center border-b py-2 lg:flex "
      v-for="post in postList"
      :key="post.id"
    >
      <h2 class="mb-1 font-bold lg:mb-0 lg:text-xl">{{ post.title }}</h2>
      <div class="flex flex-grow items-center justify-between lg:ml-4">
        <p class="text-sm text-stone-400 lg:text-base">{{ useLocalDate(post.createAt).fullDate  }}</p>
        <div class="relative">
          <button
            type="button"
            class="block p-1 text-lg leading-4 lg:hidden"
            @click="toggleEditList(post.id)"
          >
            <i class="fa-solid fa-ellipsis"></i>
          </button>
          <ul v-if="post.id === showId"
            :class="mobileEditClass"
            class="absolute right-0 top-0 w-20 -translate-y-full divide-y divide-stone-400 overflow-hidden rounded bg-light text-center shadow transition-all lg:hidden"
          >
            <li class="">
              <button
                type="button"
                class="block w-full px-4 py-2 text-sm font-normal text-red-600 hover:bg-stone-200"
              >
                刪除
              </button>
            </li>
            <li class="">
              <button
                type="button"
                @click="openEditor(false, post.id)"
                class="block w-full px-4 py-2 text-sm font-normal hover:bg-stone-200"
              >
                編輯
              </button>
            </li>
          </ul>
        </div>

        <div class="hidden gap-2 lg:flex">
          <button
            type="button"
            class="block p-2 text-lg leading-4 opacity-40 hover:text-red-700 hover:opacity-100 lg:text-xl"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
          <button
            type="button"
            @click="openEditor(false, post.id)"
            class="block p-2 text-lg leading-4 hover:text-secondary-dark lg:text-xl"
          >
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
        </div>
      </div>
    </li>
  </ul>
  <div></div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { ref } from "vue";

import usePostStore from "../../stores/postStore";
import useStatusStore from "../../stores/statusStore";
import { useLocalDate } from "../../composables/format";

const router = useRouter();
const statusStore = useStatusStore();
const postStore = usePostStore();
const { status } = storeToRefs(statusStore);
const { postList } = storeToRefs(postStore);
const { fetchPostsAll } = postStore;

const openEditor = (statusNew, id) => {
  status.value.isNewPost = statusNew;

  if (statusNew) {
    router.push("/admin/post/new");
  } else {
    router.push(`/admin/post/${id}`);
  }
};

const showEditBtn = ref(false);
const showId = ref("");
const mobileEditClass = ref("max-h-0");
const toggleEditList = (id) => {
  showId.value = id;
  showEditBtn.value = !showEditBtn.value;
  mobileEditClass.value = showEditBtn.value ? "max-h-20" : "max-h-0";
};

fetchPostsAll();

</script>
