<template>
  <router-link
    to="/"
    class="order-card"
    v-for="order in orders"
    :key="order.id"
  >
    <div class="card-header">
      <img
        src="@/assets/images/icons/users-light-blue.svg"
        class="user-photo"
        alt="order"
      />
      <p>{{ order.customer }}</p>
    </div>
    <ul>
      <li><span>Наименование товара:</span> {{ order.title }}</li>
      <li><span>Категория:</span> {{ order.category }}</li>
      <li><span>Дата покупки:</span> {{ order.date }}</li>
      <li><span>Тип:</span> {{ order.type }}</li>
      <li><span>Покрытие:</span> {{ order.cover }}</li>
      <li><span>Цвет:</span> {{ order.color }}</li>
      <li><span>Статус:</span> {{ order.status }}</li>
      <li><span>Цена:</span> {{ order.price }}</li>
      <li><span>Кол-во:</span> {{ order.number }}</li>
    </ul>
  </router-link>
</template>
<script>
export default {
  data() {
    return {
      orders: [
        {
          id: 1,
          title: "Engelberg 7000",
          category: "Окна",
          customer: "Сардорбек Максудов",
          date: "16:44 19.01.2022",
          type: "Премиум",
          cover: "Анодированная",
          color: "Черный",
          status: "Доставлен",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 2,
          title: "Engelberg 7000",
          category: "Окна",
          customer: "Сардорбек Максудов",
          date: "16:44 19.01.2022",
          type: "Премиум",
          cover: "Анодированная",
          color: "Черный",
          status: "Доставлен",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 3,
          title: "Engelberg 7000",
          category: "Окна",
          customer: "Сардорбек Максудов",
          date: "16:44 19.01.2022",
          type: "Премиум",
          cover: "Анодированная",
          color: "Черный",
          status: "Доставлен",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 4,
          title: "Engelberg 7000",
          category: "Окна",
          customer: "ПВХ",
          date: "16:44 19.01.2022",
          type: "Премиум",
          cover: "Анодированная",
          color: "Черный",
          status: "Высокий",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 5,
          title: "Engelberg 7000",
          category: "Окна",
          customer: "ПВХ",
          date: "16:44 19.01.2022",
          type: "Премиум",
          cover: "Анодированная",
          color: "Черный",
          status: "Высокий",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 6,
          title: "Engelberg 7000",
          category: "Окна",
          customer: "Сардорбек Максудов",
          date: "16:44 19.01.2022",
          type: "Премиум",
          cover: "Анодированная",
          color: "Черный",
          status: "Высокий",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 7,
          title: "Engelberg 7000",
          category: "Окна",
          customer: "Сардорбек Максудов",
          date: "16:44 19.01.2022",
          type: "Премиум",
          cover: "Анодированная",
          color: "Черный",
          status: "Высокий",
          price: "от 1.200.000 сум",
          number: "2",
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.order-card {
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
