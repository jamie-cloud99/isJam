<template>
  <Pie :options="chartOptions" :data="chartData" />
</template>

<script setup>
import { ref } from "vue";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = ref({
  labels: ["影劇", "音樂", "閱讀", "程式", "雜想"],
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
      data: [5, 2, 1, 1, 0],
    },
  ],
});

const chartOptions = ref({
  responsive: true,
});
</script>

<style scoped></style>
