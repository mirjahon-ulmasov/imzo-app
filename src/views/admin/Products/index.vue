<template>
  <FilterSidebar />
  <searchbar></searchbar>
  <div class="main-content">
    <div class="main-content-header">
      <p class="header-title">Продукция / <span>Окна: 12</span></p>
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
        <img src="@/assets/images/icons/download-btn.svg" alt="" />
        <p>Скачать</p>
      </a>
      <router-link to="/" class="action-btn"
        ><img src="@/assets/images/icons/plus-icon.svg" alt="" />
        <p>Добавить товар</p>
      </router-link>
      <div class="dropdown-btn" @click="expanded = !expanded">
        <div class="dropdown-header">
          <img src="@/assets/images/icons/edit-icon.svg" alt="" />
          <div :class="expanded ? 'triangle-down' : 'triangle-up'" />
        </div>
        <div v-if="expanded" class="dropdown-content">
          <router-link class="dropdown-item" to="/">Категории</router-link>
          <router-link class="dropdown-item" to="/">Покрытия</router-link>
          <router-link class="dropdown-item" to="/">Цвет</router-link>
          <router-link class="dropdown-item" to="/">Характеристика</router-link>
        </div>
      </div>
    </div>
    <div v-show="showBlock == false" class="flex-row">
      <ProductCard />
    </div>
    <div v-show="showBlock == true" class="flex-col" v-dragscroll.x>
      <ProductTable />
    </div>
  </div>
</template>

<script>
import FilterSidebar from "@/components/ui/FilterSidebar.vue";
import ProductCard from "@/components/ui/cards/ProductCard.vue";
import ProductTable from "@/components/ui/tables/ProductTable.vue";
export default {
  data() {
    return {
      showBlock: false,
      expanded: false,
    };
  },
  components: {
    ProductCard,
    FilterSidebar,
    ProductTable,
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
      &:nth-child(1) {
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
      &:nth-child(2) {
        float: left;
        background: #ffffff;
        margin-right: 23px;
        p {
          color: #51aafd;
          margin: 0px 13px;
          font-family: "Inter" sans-serif;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 172.34%;
        }
      }
    }
    .dropdown-btn {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 84px;
      height: 44px;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
      background: #ffffff;
      border-radius: 10px;
      cursor: pointer;
      padding: 0px 13px;
      .dropdown-header {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .dropdown-content {
        position: absolute;
        top: 3.5rem;
        right: 0;
        height: 201px;
        width: 177px;
        border-radius: 10px;
        background: #ffffff;
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding: 12px 24px;
        .dropdown-item {
          text-decoration: none;
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 133.34%;
          color: #51aafd;
        }
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
