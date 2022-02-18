<template>
  <div class="info-card">
    <h4>{{ title }}</h4>
    <div class="count">
      <img :src="imgUrl" alt="products" :class="imgClass" />
      <h4>{{ count }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "imgUrl", "imgClass", "count"],
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.info-card {
  width: 32%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;

  h4 {
    font-weight: 600;
    font-size: 18px;
    color: #383838;
  }

  .count {
    display: flex;
    align-items: center;

    img {
      padding: 8px 12px;
      border-radius: 10px;
      margin-right: 0.5rem;

      &.blue {
        background: #ebf5ff;
      }
      &.yellow {
        background: #dfffd0;
      }
    }
  }
}

@media (min-width: 1400px) {
  img {
    margin-right: 1rem !important;
  }
  h4 {
    font-size: 22px !important;
  }
}
</style>
