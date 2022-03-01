<template>
  <div class="user-table">
    <div class="table-row">
      <p>Имя</p>
      <p>Фамилия</p>
      <p>Номер телефона</p>
      <p>Город</p>
      <p>Район</p>
      <p>Улица</p>
      <p>Дом</p>
      <p>Пол</p>
      <p>Дата создания</p>
    </div>
    <router-link to="/" class="table-row" v-for="user in users" :key="user.id">
      <p>{{ user.first_name }}</p>
      <p>{{ user.last_name }}</p>
      <p>{{ user.phone_number }}</p>
      <p>{{ user.region.name }}</p>
      <p>{{ user.district.name }}</p>
      <p>{{ user.street }}</p>
      <p>{{ user.house_number }}</p>
      <p>{{ user.gender }}</p>
      <p>{{ getDate(user.created_date) }}</p>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["users"],
  methods: {
    getDate(d) {
      let date = new Date(d);
      let month = parseInt(date.getMonth()) + 1;
      return date.getDate() + "." + month + "." + date.getFullYear();
    },
  },
};
</script>
<style lang="scss" scoped>
.user-table {
  min-width: 1701px;
  width: 100%;
  height: auto;
  padding: 30px 32px;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  .table-row {
    text-decoration: none;
    width: 100%;
    padding: 24px;
    margin: 8px 0px;
    display: flex;
    background: #ffffff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
    border-radius: 15px;
    &:nth-child(1) {
      background: #ebf5ff;
      p {
        color: #383838;
        font-family: "Inter" sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 172.34%;
      }
    }
    p {
      font-family: "Inter" sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 172.34%;
      color: #93928e;
      &:nth-child(1) {
        width: 12%;
      }
      &:nth-child(2) {
        width: 12%;
      }
      &:nth-child(3) {
        width: 14%;
      }
      &:nth-child(4) {
        width: 11%;
      }
      &:nth-child(5) {
        width: 11%;
      }
      &:nth-child(6) {
        width: 11%;
      }
      &:nth-child(7) {
        width: 9%;
      }
      &:nth-child(8) {
        width: 9%;
      }
      &:nth-child(9) {
        width: 11%;
      }
    }
  }
}
</style>
