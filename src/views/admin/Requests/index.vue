<template>
  <searchbar></searchbar>
  <div class="main-content">
    <div class="main-content-header">
      <p class="header-title">Заявки: 192</p>
      <dropdown
        @input="filterPage"
        :options="[
          { title: 'Все', value: 'all' },
          { title: 'Замер', value: 'measurement' },
          { title: 'Товар', value: 'product' },
        ]"
        :default="{ title: 'Замер', value: 'measurement' }"
      ></dropdown>
    </div>
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
.main-content {
  .main-content-header {
    margin: 3rem 0px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    p.header-title {
      font-family: "Inter" sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 119.34%;
      color: #383838;
      span {
        color: #51aafd;
      }
    }
  }
}
</style>
