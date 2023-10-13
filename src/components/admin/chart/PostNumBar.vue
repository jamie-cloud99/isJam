<template>
  <Bar v-if="!status.isLoading" :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { ref, computed, toRefs, watch } from "vue";
import { storeToRefs } from "pinia";
import { Bar } from "vue-chartjs";
import useStatusStore from "@/stores/statusStore";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

const props = defineProps({
  postData: Object,
});
const { postData } = toRefs(props);

const statusStore = useStatusStore();
const { status } = storeToRefs(statusStore);

const monthList = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const monthTotalList = computed(() => {
  return monthList.map((month) => {
    const foundMonth = postData.value.monthlyData.find(
      (item) => item.title === month,
    );
    return foundMonth ? foundMonth.total : 0;
  });
});

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
);

const chartData = ref({
  labels: monthList,
  datasets: [
    {
      label: "文章數量",
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
  scale: {
    y: {
      suggestedMax: 6,
      ticks: {
        stepSize: 1,
      },
    },
  },
});

watch(
  () => postData,
  () => {
    if (postData.value.total > 0) {
      status.value.isLoading = false;
      chartData.value.datasets[0].data = monthTotalList.value;
    } else {
      status.value.isLoading = true;
    }
  },
  { deep: true, immediate: true },
);
</script>

<style scoped></style>
