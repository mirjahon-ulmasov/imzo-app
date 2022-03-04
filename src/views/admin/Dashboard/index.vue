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
  <div class="main-content" v-if="statistics">
    <div class="info">
      <InfoCard
        title="Заявка на товар"
        :imgUrl="require('@/assets/images/icons/products-bold-blue.svg')"
        imgClass="blue"
        :count="statistics.product_order"
      />
      <InfoCard
        title="Заявки на замер"
        :imgUrl="require('@/assets/images/icons/requests-bold-yellow.svg')"
        imgClass="yellow"
        :count="statistics.measurement"
      />
      <InfoCard
        title="Отзывы"
        :imgUrl="require('@/assets/images/icons/feedback-bold-yellow.svg')"
        imgClass="yellow"
        :count="statistics.rate"
      />
    </div>
    <div class="cards">
      <div class="card">
        <h4>Пользователи</h4>
        <p>
          Количество пользователей: <span>{{ statistics.total_users }}</span>
        </p>
        <div class="charts">
          <DoughnutChart
            :value="statistics.guest_users_percent"
            backgroundColor="#51aafd"
            hoverBackgroundColor="#4490d6"
            :rotation="90"
          />
          <DoughnutChart
            :value="statistics.registered_users_percent"
            backgroundColor="#4ed143"
            hoverBackgroundColor="#57af4f"
          />
        </div>
        <p
          class="statistics"
          style="--color: linear-gradient(180deg, #50a9fc 0%, #2e7fcb 100%)"
        >
          <span>{{ statistics.guest_users }}</span>
          гостей
        </p>
        <p
          class="statistics"
          style="--color: linear-gradient(180deg, #4dd043 0%, #34ad2b 100%)"
        >
          <span>{{ statistics.registered_users }}</span>
          зарегистрированных
        </p>
      </div>

      <div class="card">
        <h4>М/Ж</h4>
        <p>
          Количество зарегистрированных:
          <span>{{ statistics.registered_users }}</span>
        </p>
        <div class="charts">
          <DoughnutChart
            :value="Math.round(statistics.female_users_percent)"
            backgroundColor="#fea6e0"
            hoverBackgroundColor="#d389ba"
            :rotation="90"
          />
          <DoughnutChart
            :value="Math.round(statistics.male_users_percent)"
            backgroundColor="#51aafd"
            hoverBackgroundColor="#4490d6"
          />
        </div>
        <p
          class="statistics"
          style="--color: linear-gradient(180deg, #fca3dd 0%, #e24fb1 100%)"
        >
          <span>{{ statistics.female_users }} пользователей</span> - женщины
        </p>
        <p
          class="statistics"
          style="--color: linear-gradient(180deg, #50a9fc 0%, #2a7dca 100%)"
        >
          <span>{{ statistics.male_users }} пользователей</span> - мужчины
        </p>
      </div>
    </div>
    <div class="graph">
      <div class="content">
        <h3>Статистика продаж</h3>
        <p :style="`--color: ${stroke}`">Продажи</p>
        <div class="actions">
          <dropdown
            @input="filterChart"
            :options="[
              { title: 'Товар', value: 'product' },
              { title: 'Отзывы', value: 'rate' },
              { title: 'Замер', value: 'measurement' },
            ]"
            :default="{ title: 'Товар', value: 'product' }"
          ></dropdown>
          <div class="dates">
            <datepicker
              :date="startDateChart"
              @getDate="val => (startDateChart = val)"
            ></datepicker>
            <datepicker
              :date="endDateChart"
              @getDate="val => (endDateChart = val)"
            ></datepicker>
          </div>
        </div>
      </div>
      <LineGraph
        :color="stroke"
        :backgroundColor="fill"
        :labels="labelChart"
        :data="dataChart"
      />
    </div>
  </div>
</template>

<script>
import InfoCard from "@/components/ui/cards/InfoCard.vue";
import DoughnutChart from "@/components/charts/Doughnut.vue";
import LineGraph from "@/components/charts/LineGraph.vue";
import { computed, ref, watchEffect } from "vue";
import moment from "moment";
import { useStore } from "vuex";

export default {
  components: { InfoCard, DoughnutChart, LineGraph },
  setup() {
    const store = useStore();
    // ------------------ DatePicker ------------------
    const startDate = ref(new Date(new Date().getTime() - 31 * 86400000));
    const endDate = ref(new Date());

    watchEffect(() => {
      const start = moment(startDate.value).format("YYYY-MM-DD");
      const end = moment(endDate.value).format("YYYY-MM-DD");

      store.dispatch("fetchStatistics", { start, end });
    });

    // ------------------ Line Chart data ------------------
    // dates
    const startDateChart = ref(new Date(new Date().getTime() - 31 * 86400000));
    const endDateChart = ref(new Date());

    // colors
    const stroke = ref("#369BFF");
    const fill = ref("#efffff");
    const type = ref("product");

    watchEffect(() => {
      const start = moment(startDateChart.value).format("YYYY-MM-DD");
      const end = moment(endDateChart.value).format("YYYY-MM-DD");

      store.dispatch("fetchLineChart", { start, end, type: type.value });
    });

    const filterChart = val => {
      stroke.value =
        val === "rate"
          ? "#FDD751"
          : val === "measurement"
          ? "#4EC217"
          : "#369BFF";

      fill.value =
        val === "rate"
          ? "#effff1"
          : val === "measurement"
          ? "#effff3"
          : "#efffff";
      type.value = val;
    };
    return {
      filterChart,
      stroke,
      fill,
      startDate,
      endDate,
      startDateChart,
      endDateChart,
      statistics: computed(() => store.getters.getStatistics),
      dataChart: computed(() => store.getters.getDataChart),
      labelChart: computed(() => store.getters.getLabelsChart),
    };
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

      .statistics {
        &::before {
          display: inline-block;
          content: "";
          width: 12px;
          height: 12px;
          margin-right: 0.7rem;
          border-radius: 50%;
          background: var(--color);
        }
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
          background: var(--color);
        }
      }

      .actions {
        width: 60%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .dates {
          display: flex;
          justify-content: flex-end;
          * {
            margin-left: 1rem;
          }
        }
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
