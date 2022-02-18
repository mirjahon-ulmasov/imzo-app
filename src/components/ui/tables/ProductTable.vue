<template>
  <div class="product-table">
    <div class="table-row">
      <p>Действие</p>
      <p>Наименование товара</p>
      <p>Категория</p>
      <p>Тип</p>
      <p>Покрытие</p>
      <p>Класс</p>
      <p>Спрос</p>
      <p>Цвет</p>
      <p>Цена</p>
      <p>Кол-во</p>
      <p>Редактировать</p>
    </div>
    <div class="table-row" v-for="product in products" :key="product.id">
      <p>Действие</p>
      <p>{{ product.title }}</p>
      <p>{{ product.category }}</p>
      <p>{{ product.type }}</p>
      <p>{{ product.cover }}</p>
      <p>{{ product.class }}</p>
      <p>{{ product.demand }}</p>
      <p>{{ product.color }}</p>
      <p>{{ product.price }}</p>
      <p>{{ product.number }}</p>
      <p>Редактировать</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          title: "Engelberg 7000",
          category: "Окна",
          type: "ПВХ",
          cover: "Анодированная",
          class: "Премиум",
          demand: "Высокий",
          color: "Черный",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 2,
          title: "Engelberg 7000",
          category: "Окна",
          type: "ПВХ",
          cover: "Анодированная",
          class: "Премиум",
          demand: "Высокий",
          color: "Черный",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 3,
          title: "Engelberg 7000",
          category: "Окна",
          type: "ПВХ",
          cover: "Анодированная",
          class: "Премиум",
          demand: "Высокий",
          color: "Черный",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 4,
          title: "Engelberg 7000",
          category: "Окна",
          type: "ПВХ",
          cover: "Анодированная",
          class: "Премиум",
          demand: "Высокий",
          color: "Черный",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 5,
          title: "Engelberg 7000",
          category: "Окна",
          type: "ПВХ",
          cover: "Анодированная",
          class: "Премиум",
          demand: "Высокий",
          color: "Черный",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 6,
          title: "Engelberg 7000",
          category: "Окна",
          type: "ПВХ",
          cover: "Анодированная",
          class: "Премиум",
          demand: "Высокий",
          color: "Черный",
          price: "от 1.200.000 сум",
          number: "2",
        },
        {
          id: 7,
          title: "Engelberg 7000",
          category: "Окна",
          type: "ПВХ",
          cover: "Анодированная",
          class: "Премиум",
          demand: "Высокий",
          color: "Черный",
          price: "от 1.200.000 сум",
          number: "2",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.product-table {
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
        width: 7%;
      }
      &:nth-child(2) {
        width: 11%;
      }
      &:nth-child(3) {
        width: 8%;
      }
      &:nth-child(4) {
        width: 8%;
      }
      &:nth-child(5) {
        width: 11%;
      }
      &:nth-child(6) {
        width: 8%;
      }
      &:nth-child(7) {
        width: 8%;
      }
      &:nth-child(8) {
        width: 7%;
      }
      &:nth-child(9) {
        width: 9%;
      }
      &:nth-child(10) {
        width: 7%;
      }
      &:nth-child(11) {
        width: 16%;
      }
    }
  }
}
</style>
