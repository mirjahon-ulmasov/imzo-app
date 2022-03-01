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
    <div class="flex-col">
      <RequestCard />
    </div>
  </div>
</template>

<script>
import RequestCard from "@/components/ui/cards/RequestCard.vue";

export default {
  data() {
    return {};
  },
  components: {
    RequestCard,
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
  .flex-col {
    margin: 30px 0px 0px 0px;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      border-radius: 30px;
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      background: #f5f8fd;
      border-radius: 30px;
      border: 1px solid transparent;
      background-clip: content-box;
    }
  }
}
</style>
