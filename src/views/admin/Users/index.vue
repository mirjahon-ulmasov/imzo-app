<template>
  <div class="nav-bar">
    <h3>Общие сведения</h3>
    <dropdown
      @input="filterPage"
      :options="[
        { title: 'За все время', value: 'all' },
        { title: 'Неделя', value: 'week' },
        { title: 'Месяц', value: 'month' },
        { title: 'Квартал', value: 'quarter' },
        { title: 'Год', value: 'year' },
      ]"
      :default="{ title: 'Месяц', value: 'month' }"
    ></dropdown>
  </div>
  <div class="main-content">
    <searchbar></searchbar>
    <div class="main-content-header">
      <p class="header-title">Пользователи: <span>82.000</span></p>
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
        <dropdown
          @input="filterPage"
          :options="[
            { title: 'Все', value: 'all' },
            { title: 'Сначала старые', value: 'old' },
            { title: 'Сначала новые', value: 'new' },
          ]"
          :default="{ title: 'Сначала старые', value: 'old' }"
        ></dropdown>
      </div>
    </div>
    <div v-show="showBlock == false" class="flex-row">
      <UserCard />
    </div>
    <div v-show="showBlock == true" class="flex-col">
      <UserTable />
    </div>
  </div>
</template>

<script>
import UserCard from "@/components/ui/cards/UserCard.vue";
import UserTable from "@/components/ui/tables/UserTable.vue";
export default {
  data() {
    return {
      showBlock: false,
    };
  },
  methods: {
    filterPage(val) {
      console.log(val);
    },
  },
  components: {
    UserCard,
    UserTable,
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 24px 40px;
  background: #ffffff;
  box-shadow: 10px 5px 20px rgba(0, 0, 0, 0.05);
  z-index: 1;

  h3 {
    font-weight: 600;
    font-size: 22px;
    color: #383838;
  }
}
.main-content {
  margin-top: 5.4rem;
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
  .flex-row {
    margin: 30px 0px 0px 0px;
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
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
