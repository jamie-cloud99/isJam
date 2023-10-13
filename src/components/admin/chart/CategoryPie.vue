<template>
  <Pie v-if="!status.isLoading" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { ref, computed, toRefs, watch } from "vue";
import { storeToRefs } from "pinia";
import usePostStore from "@/stores/postStore";
import useStatusStore from "@/stores/statusStore";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

const props = defineProps({
  categoryData: Object,
});

const { categoryData } = toRefs(props);

const postStore = usePostStore();
const { categoryList } = storeToRefs(postStore);

const statusStore = useStatusStore();
const { status } = storeToRefs(statusStore);

const categoryTitles = computed(() => {
  return categoryList.value.map((category) => category.title);
});

const categoryTotalList = computed(() => {
  return categoryList.value.map((category) => {
    const foundCategory = categoryData.value.find((item) => {
      return item.title === category.code;
    });
    return foundCategory ? foundCategory.total : 0;
  });
});

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = ref({
  labels: categoryTitles.value,
  datasets: [
    {
      label: "分類數量",
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(255, 205, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(153, 102, 255, 0.5)",
        "rgba(201, 203, 207, 0.5)",
      ],
      data: [],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
});

watch(
  () => categoryData,
  () => {
    if (categoryData.value.length > 0) {
      status.value.isLoading = false;
      chartData.value.datasets[0].data = categoryTotalList.value;
    } else {
      status.value.isLoading = true;
    }
  },
  { deep: true, immediate: true },
);
</script>

<style scoped></style>
