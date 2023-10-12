<template>
  <div>
    <HeaderComponent />
    <div v-if="status.showAdminMenu">
      <div class="grid lg:grid-cols-5">
        <div class="col-span-1">
          <div
            class="fixed h-[calc(100%-102px)] w-[200px] bg-primary text-white lg:w-1/5"
          >
            <h2 class="mb-3 mt-6 px-3 text-2xl font-semibold">選單 Menu</h2>
            <ul class="flex h-[calc(100%-80px)] flex-col text-lg">
              <li
                v-for="item in menuList"
                :key="item.code"
                :class="{
                  'bg-secondary text-primary': curMenuItem.title === item.title,
                  'hover:bg-white/25 hover:text-secondary':
                    curMenuItem.title !== item.title,
                }"
                @click="changePage(item)"
              >
                <router-link :to="`/admin/${item.code}`" class="block px-3 py-4"
                  ><i class="fa-solid me-2" :class="item.icon"></i
                  >{{ item.title }}</router-link
                >
              </li>
              <li class="mt-auto">
                <button
                  @click="leaveAdmin"
                  type="button"
                  class="btn w-full px-3 py-4 text-left text-lg hover:bg-white/25"
                >
                  <i class="fa-solid fa-right-from-bracket me-2"></i>
                  登出
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-span-4">
          <div class="container py-5 pe-10 ps-5">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
    <div v-else class="container py-5">
      <RouterView />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import useStatusStore from "../stores/statusStore";
import useAdminStore from "../stores/adminStore";
import HeaderComponent from "../components/HeaderComponent.vue";

const statusStore = useStatusStore();
const { status } = storeToRefs(statusStore);

const adminStore = useAdminStore();
const { logOut, checkLogin } = adminStore;
const { isLoggedIn } = storeToRefs(adminStore);

const menuList = ref([
  {
    code: "data",
    title: "數據報表",
    icon: "fa-chart-simple",
  },
  {
    code: "posts",
    title: "管理文章",
    icon: "fa-file-lines",
  },
]);
const curMenuItem = ref(menuList.value[0]);
const route = useRoute();
const router = useRouter();

const changePage = (item) => {
  curMenuItem.value = item;
};

const leaveAdmin = () => {
  logOut();
  router.replace("/");
};

const checkAdmin = async () => {
  await checkLogin();
  if (!isLoggedIn.value) router.replace("/");
};

watch(
  () => route.path,
  () => {
    curMenuItem.value = menuList.value.find((item) =>
      route.path.includes(`/admin/${item.code}`),
    );
  },
  { immediate: true },
);

checkAdmin();
</script>
