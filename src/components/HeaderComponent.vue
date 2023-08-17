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
                <sup class=" font-Yese text-base">2</sup>
                <span class="text-2xl ml-1">BLOG</span>
              </h4>
            </RouterLink>
          </div>
          <div class="flex items-center">
            <input
              class="form-input h-10 w-[167px] border-2 border-primary bg-transparent placeholder:text-[#4F4F4F] focus:border-primary focus:ring-secondary"
              type="text"
              placeholder="探索活動"
            />
            <button
              type="button"
              class="h-10 w-10 border-2 border-l-0 border-primary bg-primary text-secondary transition-colors duration-300 hover:bg-secondary hover:text-primary"
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
            to="/"
            class="block font-Yese text-lg hover:text-secondary-dark"
          >
            <i class="icofont-ui-file mr-1"></i>
            REGISTER
          </RouterLink>
          <RouterLink
            to="/"
            class="block font-Yese text-lg hover:text-secondary-dark"
          >
            <i class="icofont-ui-user mr-1"></i>
            LOGIN
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
import MobileMenu from "./MobileMenu.vue";

const isOpen = ref(false);
const menuClass = computed(() => {
  return isOpen.value ? "max-h-screen" : "max-h-0 overflow-hidden";
});

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>
