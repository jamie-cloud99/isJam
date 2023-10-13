<template>
  <div class="mb-4 border-b-2 pb-1 lg:mb-6">
    <h1 class="font-serif text-2xl font-bold lg:text-8">數據報表</h1>
  </div>
  <div class="mb-8 lg:mb-10">
    <div class="grid grid-cols-5 gap-4">
      <div class="col-span-3">
        <div>
          <h2 class="mb-3 text-lg font-semibold lg:text-2xl">
            本年度每月文章數統計
          </h2>
          <div class="border p-4">
            <div class="mb-4 flex gap-4">
              <div
                class="flex h-32 w-32 flex-grow flex-col justify-center bg-primary/90 p-4 text-right text-white"
              >
                <h3 class="mb-2 text-lg font-medium lg:text-xl">文章總數</h3>
                <p class="text-4xl font-bold">{{ postStatistic.annulTotal }}</p>
              </div>
              <div
                class="flex h-32 w-32 flex-grow flex-col justify-center bg-primary/90 p-4 text-right text-white"
              >
                <h3
                  class="mb-2 text-lg font-medium lg:text-xl xl:whitespace-nowrap"
                >
                  本月文章數
                </h3>
                <p class="text-4xl font-bold">{{ postStatistic.monthTotal }}</p>
              </div>
              <div
                class="flex h-32 w-72 flex-grow flex-col justify-center bg-primary/20 p-4 text-right"
              >
                <h3
                  class="mb-2 text-lg font-medium lg:text-xl xl:whitespace-nowrap"
                >
                  年度目標達成率
                </h3>
                <p class="text-4xl font-bold">
                  <span
                    class="me-2 align-middle text-base font-normal text-primary/60"
                    >{{
                      `( ${postStatistic.annulTotal} / ${postStatistic.annulGoal})`
                    }}</span
                  >{{ `${annualCompletionRate}%` }}
                </p>
              </div>
            </div>
            <PostNumBar :post-data="postStatistic" />
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <div class="flex h-full flex-col">
          <h2 class="mb-3 text-lg font-semibold lg:text-2xl">
            所有文章分類占比
          </h2>
          <div class="flex-grow border p-4">
            <CategoryPie :category-data="CategoryStatistic" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { ref, computed } from "vue";
import PostNumBar from "../../components/admin/chart/PostNumBar.vue";
import CategoryPie from "../../components/admin/chart/CategoryPie.vue";
import usePostStore from "../../stores/postStore";
import { useLocalDate } from "../../composables/format";

const postStore = usePostStore();
const { postList } = storeToRefs(postStore);
const { fetchPostsAll } = postStore;

const fetchData = async () => {
  if (!postList.value.length) await fetchPostsAll();
  updatePostNum();
  updateMonthlyNum();
  updateCategoryNum();
};

const fetchPostDate = (item) => {
  const year = useLocalDate(item.createAt).year;
  const month = new Date(item.createAt * 1000).getMonth();
  return { year, month };
};

const postStatistic = ref({
  annulGoal: 15,
  annulTotal: 0,
  monthTotal: 0,
  total: 0,
  monthlyData: [],
});

const annualCompletionRate = computed(() => {
  return Math.round(
    (postStatistic.value.annulTotal / postStatistic.value.annulGoal) * 100,
  );
});

const CategoryStatistic = ref([]);

const curYear = new Date().getFullYear();
const curMonth = new Date().getMonth();

const updatePostNum = () => {
  postStatistic.value.total = postList.value.length;
  postStatistic.value.annulTotal = postList.value.filter(
    (post) => curYear === parseInt(fetchPostDate(post).year),
  ).length;
  postStatistic.value.monthTotal = postList.value.filter(
    (post) =>
      curMonth === parseInt(fetchPostDate(post).month) &&
      curYear === parseInt(fetchPostDate(post).year),
  ).length;
};

const updateMonthlyNum = () => {
  const postCounts = {};
  const annualPostList = postList.value.filter(
    (post) => curYear === parseInt(fetchPostDate(post).year),
  );
  annualPostList.forEach((post) => {
    const month = useLocalDate(post.createAt).month;
    postCounts[month] = (postCounts[month] || 0) + 1;
  });

  postStatistic.value.monthlyData = Object.keys(postCounts).map((month) => {
    const count = postCounts[month];
    return { title: month, total: count };
  });
};

const updateCategoryNum = () => {
  const categoryCounts = {};
  postList.value.forEach((post) => {
    const category = post.category;
    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
  });
  const totalPosts = postStatistic.value.total;
  CategoryStatistic.value = Object.keys(categoryCounts).map((category) => {
    const count = categoryCounts[category];
    const percent = Math.round((count / totalPosts) * 100) + "%";
    return { title: category, total: count, percent };
  });
};

fetchData();
</script>
