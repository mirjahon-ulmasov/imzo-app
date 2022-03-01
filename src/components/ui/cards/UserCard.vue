<template>
  <router-link to="/" class="user-card" v-for="user in users" :key="user.id">
    <div class="card-header">
      <img
        src="@/assets/images/icons/users-light-blue.svg"
        class="user-photo"
        alt="user"
      />
      <p>{{ user.first_name }} {{ user.last_name }}</p>
    </div>
    <ul>
      <li><span>Номер телефона:</span> {{ user.phone_number }}</li>
      <li><span>Город:</span> {{ user.district.name }}</li>
      <li><span>Район:</span> {{ user.region.name }}</li>
      <li><span>Улица:</span> {{ user.street }}</li>
      <li><span>Дом:</span> {{ user.house_number }}</li>
      <li><span>Пол:</span> {{ user.gender }}</li>
      <li><span>Дата создания:</span> {{ getDate(user.created_date) }}</li>
    </ul>
  </router-link>
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
.user-card {
  text-decoration: none;
  margin: 10px;
  padding: 32px;
  max-width: 500px;
  width: 45%;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  .card-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    .user-photo {
      padding: 13px;
      overflow: hidden;
      background: #ffffff;
      border-radius: 50%;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
    }
    p {
      margin: 0px 10px;
      font-family: "Inter" sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 172.34%;
      color: #383838;
    }
  }
  ul li {
    margin: 8px 0px;
    list-style-type: none;
    font-family: "Inter" sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 172.34%;
    color: #93928e;
    span {
      font-family: "Inter" sans-serif;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 172.34%;
      color: #383838;
    }
  }
}
</style>
