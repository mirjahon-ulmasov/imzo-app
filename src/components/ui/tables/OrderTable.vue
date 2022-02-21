<template>
  <div class="order-table">
    <div class="table-row">
      <p>Наименование товара</p>
      <p>Категория</p>
      <p>Покупатель</p>
      <p>Дата покупки</p>
      <p>Тип</p>
      <p>Покрытие</p>
      <p>Цвет</p>
      <p>Статус</p>
      <p>Цена</p>
      <p>Кол-во</p>
    </div>
    <div class="table-row" v-for="order in orders" :key="order.id">
      <p>{{ order.title }}</p>
      <p>{{ order.category }}</p>
      <p>{{ order.customer }}</p>
      <p>{{ order.date }}</p>
      <p>{{ order.type }}</p>
      <p>{{ order.cover }}</p>
      <p>{{ order.color }}</p>
      <p>{{ order.status }}</p>
      <p>{{ order.price }}</p>
      <p>{{ order.number }}</p>
    </div>
  </div>
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
.order-table {
  min-width: 2534px;
  width: 100%;
  height: auto;
  padding: 30px 32px;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  .table-row {
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
        color: #383838 !important;
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
        width: 10%;
      }
      &:nth-child(3) {
        width: 12%;
      }
      &:nth-child(4) {
        width: 10%;
      }
      &:nth-child(5) {
        width: 10%;
      }
      &:nth-child(6) {
        width: 10%;
      }
      &:nth-child(7) {
        width: 10%;
      }
      &:nth-child(8) {
        width: 10%;
        color: #51aafd;
      }
      &:nth-child(9) {
        width: 10%;
      }
      &:nth-child(10) {
        width: 6%;
      }
    }
  }
}
</style>
