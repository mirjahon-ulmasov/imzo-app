<template>
  <div class="nav-bar">
    <h3>Общие сведения</h3>
    <div class="dates">
      <datepicker
        :date="startDate"
        @getDate="val => (startDate = val)"
      ></datepicker>
      <datepicker
        :date="endDate"
        @getDate="val => (endDate = val)"
      ></datepicker>
    </div>
  </div>
  <div class="main-content">
    <searchbar></searchbar>
    <div class="main-content-header">
      <p class="header-title">Пользователи: <span>82.000</span></p>
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
    <div v-if="showBlock == false" class="flex-row">
      <UserCard :users="users" />
    </div>
    <div v-if="showBlock == true" class="flex-col" v-dragscroll.x>
      <UserTable :users="users" />
    </div>
    <Pagination />
  </div>
</template>

<script>
import Pagination from "@/components/helpers/Pagination.vue";
import UserCard from "@/components/ui/cards/UserCard.vue";
import UserTable from "@/components/ui/tables/UserTable.vue";
export default {
  data() {
    return {
      showBlock: false,
      users: [],
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
    Pagination,
  },
  async mounted() {
    this.$store.dispatch("fetchUsers").then(response => {
      this.users = response.data.items;
      this.pagination = response.data.pagination;
    });
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

  .dates {
    width: 40%;
    display: flex;
    justify-content: flex-end;
    * {
      margin-left: 1rem;
    }
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
