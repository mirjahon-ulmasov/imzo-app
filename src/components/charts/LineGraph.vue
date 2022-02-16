<template>
  <div class="wrapper">
    <LineChart v-bind="lineChartProps" class="chart" />
  </div>
</template>

<script>
import { LineChart, useLineChart } from "vue-chart-3";
import { computed } from "@vue/runtime-core";
export default {
  components: { LineChart },
  setup() {
    const chartData = computed(() => {
      const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
      return {
        labels: labels,
        datasets: [
          {
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: true,
            tension: 0.4,
            borderColor: "#369BFF",
            backgroundColor: "#efffff",
          },
        ],
      };
    });

    const { lineChartProps, lineChartRef } = useLineChart({
      chartData,
      options: {
        reponsive: false,
        maintainAspectRatio: false,
        tooltips: {
          enabled: false,
        },
        plugins: {
          title: false,
          subtitle: false,
          legend: false,
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
            },
          },
        },
      },
    });
    return { lineChartProps, lineChartRef };
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  overflow-y: scroll;

  .chart {
    margin-top: 1rem;
    height: 350px;
    z-index: 1;
  }
}
</style>
