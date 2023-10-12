<template>
  <header class="sticky top-0 z-[100] border-b-2 bg-light py-6 lg:border-b-3">
    <div class="container">
      <div class="items-center justify-between lg:flex">
        <div class="flex justify-between lg:gap-12">
          <div class="flex-shrink-0">
            <RouterLink to="/" class="block items-center lg:flex">
              <img
                class="h-10 w-10"
                src="/images/logo.svg"
                alt="Jam Blog logo"
              />
              <h4 class="hidden items-center gap-1 font-serif lg:ml-2 lg:flex">
                <span class="font-Yese text-8">Jam</span>
                <sup class="font-Yese text-base">2</sup>
                <span class="ml-1 text-2xl">BLOG</span>
              </h4>
            </RouterLink>
          </div>
          <div class="flex items-center">
            <input
              class="form-input h-10 w-[167px] border-2 border-primary bg-transparent placeholder:text-[#4F4F4F] focus:border-primary focus:ring-secondary lg:h-[51px] lg:w-[284px]"
              type="text"
              placeholder="探索文章"
              v-model="keyword"
            />
            <button
              type="button"
              @click="goSearch(keyword)"
              class="h-10 w-10 border-2 border-l-0 border-primary bg-primary text-secondary transition-colors duration-300 hover:bg-secondary hover:text-primary lg:h-[51px] lg:w-[51px]"
            >
              <i class="icofont-search-1"></i>
            </button>
          </div>
          <button
            type="button"
            @click="toggleMenu"
            class="h-[38px] rounded border px-[9px] lg:hidden"
          >
            <img src="/images/menu.svg" alt="menu button" />
          </button>
        </div>
        <div class="hidden lg:flex lg:gap-6">
          <RouterLink
            to="/posts"
            class="block font-serif text-lg font-semibold hover:text-secondary-dark"
          >
            <i class="icofont-ui-file mr-1"></i>
            文章總覽
          </RouterLink>
          <RouterLink
            v-if="!isLoggedIn"
            to="/logIn"
            class="block font-Yese text-lg hover:text-secondary-dark"
          >
            <i class="icofont-ui-user mr-1"></i>
            LOGIN
          </RouterLink>
          <RouterLink
            v-else
            to="/admin/data"
            class="block font-serif text-lg font-semibold hover:text-secondary-dark"
          >
            <i class="icofont-ui-user mr-1"></i>
            管理員後台
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
  <MobileMenu
    :class="menuClass"
    class="transition-all duration-500 lg:hidden"
  />
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import MobileMenu from "./MobileMenu.vue";
import usePostStore from "../stores/postStore";
import useAdminStore from "../stores/adminStore";

const router = useRouter();

const postStore = usePostStore();
const { searchPosts } = postStore;

const adminStore = useAdminStore();
const { isLoggedIn } = storeToRefs(adminStore);

const isOpen = ref(false);
const keyword = ref("");

const menuClass = computed(() => {
  return isOpen.value ? "max-h-screen" : "max-h-0 overflow-hidden";
});

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const goSearch = async (text) => {
  await searchPosts(text);
  router.push({ path: "/search", query: { kw: text } });
};
</script>
