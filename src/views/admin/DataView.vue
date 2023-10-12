<template>
  <div class="mb-4 border-b-2 pb-1 lg:mb-6">
    <h1 class="font-serif text-2xl font-bold lg:text-8">數據報表</h1>
  </div>
  <div class="mb-8 lg:mb-10">
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-3">
        <div class="">
          <h2 class="mb-3 text-lg font-semibold lg:text-2xl">
            本年度每月文章數統計
          </h2>
          <div class=" border p-4">
            <div class="mb-4 flex gap-4">
              <div
                class="flex h-32 w-32 flex-grow flex-col justify-center bg-primary/90 p-4 text-right text-white"
              >
                <h3 class="mb-2 text-lg font-medium lg:text-xl">文章總數</h3>
                <p class="text-4xl font-bold">10</p>
              </div>
              <div
                class="flex h-32 w-32 flex-grow flex-col justify-center bg-primary/90 p-4 text-right text-white"
              >
                <h3 class="mb-2 xl:whitespace-nowrap text-lg font-medium lg:text-xl">
                  本月文章數
                </h3>
                <p class="text-4xl font-bold">2</p>
              </div>
              <div
                class="flex h-32 w-72 flex-grow flex-col justify-center bg-primary/20 p-4 text-right"
              >
                <h3 class="mb-2 xl:whitespace-nowrap text-lg font-medium lg:text-xl">
                  年度目標達成率
                </h3>
                <p class="text-4xl font-bold">
                  <span
                    class="me-2 align-middle text-base font-normal text-primary/60"
                    >(10 / 20)</span
                  >50%
                </p>
              </div>
            </div>
            <PostNumBar />
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div class="h-full flex flex-col">
          <h2 class="mb-3 text-lg font-semibold lg:text-2xl">所有文章分類占比</h2>
          <div class="border p-4 flex-grow">
            <CategoryPie />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import PostNumBar from "../../components/admin/chart/PostNumBar.vue";
import CategoryPie from "../../components/admin/chart/CategoryPie.vue";

</script>
