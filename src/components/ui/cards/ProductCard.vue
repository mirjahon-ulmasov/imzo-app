<template>
  <div v-for="product in products" :key="product.id" class="product-card">
    <div class="card-action">
      <Cross />
    </div>
    <div class="card-action">
      <Archive />
    </div>
    <router-link class="product-card-body" to="/">
      <ul>
        <li><span>Imzo</span> {{ product.title }}</li>
        <li><span>Категория:</span> {{ product.category }}</li>
        <li><span>Тип:</span> {{ product.type }}</li>
        <li><span>Покрытие:</span> {{ product.cover }}</li>
        <li><span>Класс:</span> {{ product.class }}</li>
        <li><span>Спрос:</span> {{ product.demand }}</li>
        <li><span>Цена:</span> {{ product.color }}</li>
        <li><span>Кол-во:</span> {{ product.number }}</li>
      </ul>
    </router-link>
  </div>
</template>
<script>
import Cross from "@/components/ui/buttons/Cross.vue";
import Archive from "@/components/ui/buttons/Archive.vue";
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
  components: {
    Cross,
    Archive,
  },
};
</script>
<style lang="scss" scoped>
.product-card {
  margin: 10px;
  padding: 32px;
  max-width: 500px;
  width: 45%;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  position: relative;
  .card-action {
    right: 5%;
    width: fit-content;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    &:nth-child(1) {
      top: 9%;
    }
    &:nth-child(2) {
      bottom: 10%;
    }
  }
  .product-card-body {
    text-decoration: none;
    ul li {
      margin-bottom: 4px;
      list-style-type: none;
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 172.34%;
      color: #93928e;
      span {
        color: #383838;
        font-weight: 600;
      }
      &:nth-child(1) {
        margin-bottom: 20px;
        font-style: normal;
        font-weight: 400;
        font-size: 22px;
        line-height: 172.34%;
        color: #93928e;
        span {
          color: #383838;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
