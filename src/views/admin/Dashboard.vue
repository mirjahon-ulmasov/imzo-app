<template>
  <div class="nav-bar">
    <h3>Общие сведения</h3>
    <dropdown></dropdown>
  </div>
  <div class="main-content">
    <p>Количество посещений: <span>1.900.000</span></p>
    <div class="info">
      <InfoCard
        title="Заявка на товар"
        :imgUrl="require('@/assets/images/icons/products-bold-blue.svg')"
        imgClass="blue"
        :count="185"
      />
      <InfoCard
        title="Заявки на замер"
        :imgUrl="require('@/assets/images/icons/requests-bold-yellow.svg')"
        imgClass="yellow"
        :count="192"
      />
      <InfoCard
        title="Отзывы"
        :imgUrl="require('@/assets/images/icons/feedback-bold-yellow.svg')"
        imgClass="yellow"
        :count="132"
      />
    </div>
    <div class="cards">
      <div class="card">
        <h4>Пользователи</h4>
        <p>Количество пользователей: <span>192.000</span></p>
        <div class="charts">
          <DoughnutChart
            :value="53.4"
            backgroundColor="#51aafd"
            hoverBackgroundColor="#4490d6"
            :rotation="90"
          />
          <DoughnutChart
            :value="46.6"
            backgroundColor="#4ed143"
            hoverBackgroundColor="#57af4f"
          />
        </div>
        <p style="margin-left: 1.5rem">
          <span
            class="radio"
            style="
              background: linear-gradient(180deg, #50a9fc 0%, #2e7fcb 100%);
            "
          /><span>110.000</span>
          гостей
        </p>
        <p style="margin-left: 1.5rem">
          <span
            class="radio"
            style="
              background: linear-gradient(180deg, #4dd043 0%, #34ad2b 100%);
            "
          /><span>82.000</span>
          зарегистрированных
        </p>
      </div>

      <div class="card">
        <h4>М/Ж</h4>
        <p>Количество зарегистрированных: <span>82.000</span></p>
        <div class="charts">
          <DoughnutChart
            :value="40"
            backgroundColor="#fea6e0"
            hoverBackgroundColor="#d389ba"
            :rotation="90"
          />
          <DoughnutChart
            :value="60"
            backgroundColor="#51aafd"
            hoverBackgroundColor="#4490d6"
          />
        </div>
        <p style="margin-left: 1.5rem">
          <span
            class="radio"
            style="
              background: linear-gradient(180deg, #fca3dd 0%, #e24fb1 100%);
            "
          ></span
          ><span>30.000 пользователей</span> - женщины
        </p>
        <p style="margin-left: 1.5rem">
          <span
            class="radio"
            style="
              background: linear-gradient(180deg, #50a9fc 0%, #2a7dca 100%);
            "
          ></span
          ><span>52.000 пользователей</span> - мужчины
        </p>
      </div>
    </div>
    <div class="graph">
      <div class="content">
        <h3>Статистика продаж</h3>
        <p>Продажи</p>
        <div class="actions">
          <dropdown></dropdown>
          <dropdown></dropdown>
        </div>
      </div>
      <LineGraph />
    </div>
  </div>
</template>

<script>
import InfoCard from "@/components/ui/cards/InfoCard.vue";
import DoughnutChart from "@/components/charts/Doughnut.vue";
import LineGraph from "@/components/charts/LineGraph.vue";
export default {
  components: { InfoCard, DoughnutChart, LineGraph },
  setup() {
    return {};
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
  margin-top: 5rem;

  p {
    position: relative;
    font-weight: 400;
    font-size: 18px;
    color: #93928e;

    span {
      font-weight: 600;
      color: #383838;
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
  }

  .cards {
    display: flex;
    width: 100%;
    margin-top: 1.5rem;
    justify-content: space-between;

    .card {
      width: 49%;
      display: inline-block;
      background: #ffffff;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
      padding: 32px;
      border-radius: 20px;

      * {
        margin: 15px 0;
      }

      .radio {
        position: absolute;
        top: -0.7rem;
        left: -1.5rem;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }

      h4 {
        font-weight: 600;
        font-size: 20px;
        color: #383838;
      }

      .charts {
        display: flex;
        justify-content: space-around;
        * {
          width: 10rem;
          height: 10rem;
        }
      }
    }
  }

  .graph {
    margin-top: 2rem;
    padding: 2rem;
    background: #ffffff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
    border-radius: 20px;

    .content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      h3 {
        font-weight: 600;
        font-size: 20px;
        color: #383838;
      }

      p {
        font-size: 18px;
        color: #383838;

        &::before {
          display: inline-block;
          content: "";
          width: 12px;
          height: 12px;
          margin-right: 0.7rem;
          border-radius: 50%;
          background: #51aafd;
        }
      }

      .actions {
        width: 40%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}

@media (min-width: 1400px) {
  .main-content {
    p {
      font-size: 22px !important;
    }
    .card {
      p {
        font-size: 20px !important;
      }
    }
  }
}
</style>
