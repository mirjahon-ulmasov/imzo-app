<template>
  <div class="chart">
    <DoughnutChart v-bind="doughnutChartProps" />
    <div class="circle-big"></div>
    <div class="circle-small"></div>
    <h4>{{ value }}%</h4>
  </div>
</template>

<script>
import { DoughnutChart, useDoughnutChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
import { computed } from "vue";

Chart.register(...registerables);
export default {
  components: { DoughnutChart },
  props: {
    value: {
      type: Number,
      default: 100,
    },
    backgroundColor: {
      type: String,
      default: "#555",
    },
    hoverBackgroundColor: {
      type: String,
      default: "#333",
    },
    rotation: {
      type: Number,
      default: 360,
    },
  },
  setup(props) {
    const chartData = computed(() => ({
      datasets: [
        {
          data: [props.value, 100 - props.value],
          backgroundColor: [props.backgroundColor, "#f8f8f8"],
          hoverBackgroundColor: [props.hoverBackgroundColor, "#efefef"],
        },
      ],
    }));

    const options = computed(() => ({
      reponsive: true,
      maintainAspectRatio: false,
      rotation: (props.rotation / 2) * -1,
      circumference: 350,
      cutout: "85%",
      tooltips: {
        enabled: true,
      },
      borderWidth: 0,
      borderRadius: {
        innerStart: 50,
        outerStart: 50,
        innerEnd: 50,
        outerEnd: 50,
      },
      plugins: {
        title: false,
        subtitle: false,
        legend: false,
      },
    }));

    const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
      chartData,
      options,
    });

    return { doughnutChartProps, doughnutChartRef };
  },
};
</script>

<style lang="scss" scoped>
.chart {
  position: relative;

  .circle-big {
    position: absolute;
    top: 10.5%;
    left: 10.5%;
    width: 125px;
    height: 125px;
    border: 3px solid #f8f8f8;
    border-radius: 50%;
  }
  .circle-small {
    position: absolute;
    top: 15%;
    left: 15.5%;
    width: 110px;
    height: 110px;
    border: 2px solid #f8f8f8;
    border-radius: 50%;
  }

  h4 {
    position: absolute;
    display: inline-block;
    top: 44%;
    left: 30%;
    width: 4rem;
    text-align: center;
    font-weight: 600;
    font-size: 20px;
    color: #383838;
  }
}
</style>
