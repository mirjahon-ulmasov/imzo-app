<template>
  <div class="main-content" v-if="$route.path === '/showrooms'">
    <h3>Шоурумы</h3>
    <div class="actions">
      <router-link :to="{ name: 'addShowroom' }" class="btn">
        <img src="@/assets/images/icons/showrooms-light.svg" alt="showroom" />
        Добавить шоурум
      </router-link>
      <dropdown
        @input="filterPage"
        :options="[
          { title: 'Сначала старые', value: 'old' },
          { title: 'Сначала новые', value: 'new' },
        ]"
        :default="{ title: 'Сначала новые', value: 'new' }"
      ></dropdown>
    </div>
    <div v-dragscroll.x class="scroll">
      <div class="table">
        <div class="row table-header">
          <p>Название шоурума</p>
          <p>Долгота и широта</p>
          <p>Дата создания</p>
          <p>Город</p>
          <p>Район</p>
          <p>Улица</p>
          <p>Редактировать</p>
        </div>
        <div v-if="showroomList">
          <div
            class="row table-body"
            v-for="(showroom, i) in showroomList"
            :key="i"
          >
            <p>{{ showroom.name || "&#8212;" }}</p>
            <p>{{ showroom.longitude_and_latitude }}</p>
            <p>
              <span>{{ getTime(showroom.created_at) }}</span>
              {{ getDate(showroom.created_at) }}
            </p>
            <p>{{ showroom.region }}</p>
            <p>{{ showroom.district }}</p>
            <p>
              {{ showroom.address_street
              }}{{
                showroom.address_house_number
                  ? `, ${showroom.address_house_number}`
                  : ""
              }}
            </p>
            <p>
              <router-link
                :to="{ name: 'editShowroom', params: { id: showroom.id } }"
              >
                <img
                  src="@/assets/images/icons/edit-small.svg"
                  alt="edit"
                  style="background: #edf7ff"
                />
                Изменить
              </router-link>
            </p>
            <p @click="deleteHandler(showroom.id)">
              <img
                src="@/assets/images/icons/trash.svg"
                alt="trash"
                style="background: #ffeded"
              />
              Удалить
            </p>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!showroomList" class="no-data">Результаты не найдены.</div>
  </div>
  <router-view></router-view>
  <notification
    :isShow="notification.isShow"
    :header="notification.header"
    :content="notification.content"
    :is_success="notification.isSuccess"
    @cancel="cancelHandler"
    @ok="okHandler"
  ></notification>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import moment from "moment";

export default {
  setup() {
    const store = useStore();
    onMounted(() => {
      moment.locale("ru");
    });

    const filterPage = value => {
      store.dispatch("fetchShowrooms", value);
    };

    // -------------- Time and Date --------------
    const getTime = time => {
      return moment(Date.parse(time)).format("LT");
    };
    const getDate = date => {
      return moment(Date.parse(date)).format("L");
    };

    // -------------- Delete Showroom --------------
    const deletedId = ref("");
    const deleteHandler = id => {
      deletedId.value = id;
      notification.value = {
        isShow: true,
        isSuccess: false,
        header: "Действительно хотите удалить?",
        content: "Данные файлы будут безвозвратно удалены",
      };
    };

    // -------------- Notifications --------------
    const notification = ref({
      isShow: false,
      isSuccess: false,
      header: "",
      content: "",
    });

    const cancelHandler = () => {
      notification.value = {
        isShow: false,
        isSuccess: false,
        header: "",
        content: "",
      };
      deletedId.value = "";
    };

    const okHandler = () => {
      store.dispatch("deleteShowroomById", deletedId.value);
    };

    return {
      getTime,
      getDate,
      filterPage,
      deleteHandler,
      notification,
      cancelHandler,
      okHandler,
      showroomList: computed(() => store.getters.getShowroomList),
    };
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  h3 {
    font-weight: 600;
    font-size: 22px;
    color: #383838;
  }

  .no-data {
    text-align: center;
    margin-top: 1rem;
    color: #383838;
    font-size: 18px;
  }

  .actions {
    display: flex;
    align-items: center;
    margin: 1rem 0 2rem 0;
    justify-content: space-between;

    .btn {
      display: flex;
      width: 210px;
      justify-content: space-between;
      align-items: center;
      border: none;
      color: #51aafd;
      font-size: 16px;
      padding: 8px 16px;
      background: #ffffff;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
      text-decoration: none;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  .scroll {
    overflow-x: scroll;

    .table {
      min-width: 1750px;
      width: 100%;
      height: auto;
      padding: 30px 32px;
      background: #ffffff;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);

      .row {
        text-decoration: none;
        width: 100%;
        margin: 8px 0px;
        display: flex;
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
        border-radius: 15px;
        p {
          font-weight: 400;
          font-size: 16px;
          color: #93928e;
          &:nth-child(1),
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(7) {
            width: 12%;
          }
          &:nth-child(6) {
            width: 18%;
          }
          &:nth-child(2) {
            width: 15%;
          }
        }
      }
      .table-header {
        padding: 30px 25px;
        background: #ebf5ff;
        p {
          font-weight: 600;
          color: #383838;
        }
      }
      .table-body {
        padding: 20px 25px;
        background: #ffffff;

        p {
          display: flex;
          align-items: center;

          &:first-child {
            font-weight: 600;
            color: #51aafd;
          }
          &:nth-child(2),
          &:nth-child(7) {
            color: #51aafd;
            a {
              display: flex;
              color: #51aafd;
              cursor: pointer;
              align-items: center;
              text-decoration: none;
            }
          }
          &:last-child {
            color: #ec6464cc;
            cursor: pointer;
          }
          span {
            font-weight: bold;
            color: #383838;
            margin-right: 5px;
          }
          img {
            border-radius: 10px;
            margin-right: 0.7rem;
            padding: 8px;
          }
        }
      }
    }
  }
}
</style>
