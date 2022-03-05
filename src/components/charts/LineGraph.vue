<template>
  <div class="scroll">
    <canvas id="linechart" height="300" class="chart"></canvas>
  </div>
</template>

<script>
import { onMounted } from "vue";

export default {
  props: {
    color: {
      type: String,
      default: "#369BFF",
    },
    backgroundColor: {
      type: String,
      default: "#efffff",
    },
    labels: {
      type: Array,
      default: null,
    },
    data: {
      type: Array,
      default: null,
    },
  },
  updated() {
    const chart = document.getElementById("linechart").getContext("2d");
    const data = {
      labels: this.$props.labels,
      datasets: [
        {
          fillColor: this.$props.backgroundColor,
          strokeColor: this.$props.color,
          pointColor: this.$props.backgroundColor,
          pointHighlightFill: this.$props.color,
          data: this.$props.data,
        },
      ],
    };
    // eslint-disable-next-line no-undef
    new Chart(chart).Line(data);
  },
  setup(props) {
    onMounted(() => {
      const chart = document.getElementById("linechart").getContext("2d");
      const data = {
        labels: props.labels,
        datasets: [
          {
            fillColor: props.backgroundColor,
            strokeColor: props.color,
            pointColor: props.backgroundColor,
            pointHighlightFill: props.color,
            data: props.data,
          },
        ],
      };
      // eslint-disable-next-line no-undef
      new Chart(chart).Line(data);
    });

    return {};
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  width: 100%;

  .chart {
    margin-top: 1rem;
    width: 300%;
    height: 350px;
    z-index: 1;
  }
}
</style>
