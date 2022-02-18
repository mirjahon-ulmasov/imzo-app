<template>
  <FilterSidebar />
  <searchbar></searchbar>
  <div class="main-content">
    <div class="main-content-header">
      <p class="header-title">Продукция / Окна: 12</p>
      <div class="filter-block">
        <p>Вид</p>
        <button @click="showBlock = !showBlock" class="tab-btn">
          <img
            :src="
              require(`@/assets/images/icons/dashboard${
                showBlock === true ? '-light.svg' : '-bold-blue.svg'
              }`)
            "
            alt="card"
          />
        </button>
        <button @click="showBlock = !showBlock" class="tab-btn">
          <img
            :src="
              require(`@/assets/images/icons/icon-park_hamburger-button${
                showBlock === false ? '-light.svg' : '-bold.svg'
              }`)
            "
            alt="card"
          />
        </button>
      </div>
    </div>
    <div v-show="showBlock == false" class="flex-row">card</div>
    <div v-show="showBlock == true" class="flex-col">table</div>
  </div>
</template>

<script>
import FilterSidebar from "@/components/ui/FilterSidebar.vue";
export default {
  data() {
    return {
      showBlock: false,
    };
  },
  components: {
    FilterSidebar,
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  .main-content-header {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    p.header-title {
      font-family: "Inter";
      font-style: normal;
      font-weight: normal;
      font-size: 22px;
      line-height: 172.34%;
      color: #93928e;
      span {
        color: black;
      }
    }
    .filter-block {
      display: flex;
      flex-direction: row;
      align-items: center;
      p {
        font-family: "Inter" sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 119.34%;
        color: #383838;
        margin: 0px 10px;
      }
      .tab-btn {
        cursor: pointer;
        margin: 0px 10px;
        border: none;
        background: none;
      }
    }
  }
}
</style>
