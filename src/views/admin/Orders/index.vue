<template>
  <FilterSidebar />
  <searchbar></searchbar>
  <div class="main-content">
    <div class="main-content-header">
      <div class="info-card">
        <img src="@/assets/images/icons/products-bold-blue.svg" alt="" />
        Заказы: 185
      </div>
      <div class="filter-block">
        <p>Вид</p>
        <button @click="showBlock = false" class="tab-btn">
          <img
            :src="
              require(`@/assets/images/icons/dashboard${
                showBlock === true ? '-light.svg' : '-bold-blue.svg'
              }`)
            "
            alt="card"
          />
        </button>
        <button @click="showBlock = true" class="tab-btn">
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
    <div class="action-bar">
      <a class="action-btn">
        <img src="~@/assets/images/icons/download-btn.svg" alt="" />
        <p>Скачать</p>
      </a>
      <p>Фильтр: <span>Окна / Engelberg 7000</span></p>
    </div>
    <div v-show="showBlock == false" class="flex-row">
      <OrderCard />
    </div>
    <div v-show="showBlock == true" class="flex-col" v-dragscroll.x>
      <OrderTable />
    </div>
  </div>
</template>

<script>
import OrderCard from "@/components/ui/cards/OrderCard.vue";
import FilterSidebar from "@/components/ui/FilterSidebar.vue";
import OrderTable from "@/components/ui/tables/OrderTable.vue";
export default {
  data() {
    return {
      showBlock: true,
      info: "",
    };
  },
  components: {
    FilterSidebar,
    OrderTable,
    OrderCard,
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
    .info-card {
      padding: 10px 20px;
      background: #ffffff;
      box-shadow: 0px 5px 29px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 172.34%;
      color: #51aafd;
      display: flex;
      align-items: center;
      img {
        margin-right: 5px;
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
  .action-bar {
    p {
      font-style: normal;
      font-weight: 600;
      font-size: 22px;
      line-height: 172.34%;
      color: #383838;
      span {
        color: #51aafd;
      }
    }
    .action-btn {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: fit-content;
      height: 44px;
      justify-content: center;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      text-decoration: none;
      cursor: pointer;
      padding: 0px 13px;
      background: #51aafd;
      float: right;
      p {
        color: #ffffff;
        margin: 0px 13px;
        font-family: "Inter" sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 172.34%;
      }
    }
  }
  .flex-row {
    margin: 30px 0px 0px 0px;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
  }
  .flex-col {
    cursor: -webkit-grab;
    cursor: -moz-grab;
    cursor: -o-grab;
    cursor: grab;
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
