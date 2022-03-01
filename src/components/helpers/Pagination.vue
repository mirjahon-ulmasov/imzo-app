<template>
  <div class="pagination-container">
    <span class="pagination-double-arrow"> </span>
    <span class="pagination-arrow"></span>
    <div class="pagination-btns">
      <span class="btn">1</span>
      <span class="btn">2</span>
      <span class="btn">3</span>
      <span class="btn">4</span>
      <span class="btn">5</span>
    </div>
    <span class="pagination-arrow"></span>
    <span class="pagination-double-arrow"></span>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.pagination-container {
  margin: 20px auto;
  width: fit-content;
  height: auto;
  .pagination-btns {
    display: flex;
    flex-direction: row;
    span.btn {
      cursor: pointer;
      margin: 0px 10px;
      filter: drop-shadow(0px 5px 20px rgba(0, 0, 0, 0.05));
      width: 40px;
      height: 40px;
      background: #ffffff;
      border-radius: 10px;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 43px;
      color: #51aafd;
      text-align: center;
      &:hover {
        background: #51aafd;
        color: white;
      }
    }
  }
}
</style>
