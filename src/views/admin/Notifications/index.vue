<template>
  <div class="main-content" v-if="$route.path === '/notifications'">
    <h3>Уведомления</h3>
    <div class="actions">
      <router-link :to="{ name: 'addNotification' }" class="btn">
        <img src="@/assets/images/icons/plus-small.svg" alt="add" />
        Добавить уведомление
      </router-link>
      <dropdown
        @input="filterPage"
        :options="[
          { title: 'Запланированные', value: 'planned' },
          { title: 'Опубликованные', value: 'published' },
          { title: 'Удаленные', value: 'deleted' },
        ]"
        :default="{ title: 'Запланированные', value: 'planned' }"
      ></dropdown>
    </div>
    <div v-dragscroll.x class="scroll">
      <div class="table">
        <div class="row table-header">
          <div class="left">
            <p>Точка отправления</p>
            <p>Текст заголовка</p>
            <p>План отправления</p>
            <p>Дата создания</p>
          </div>
          <div class="right">
            <p>Редактировать</p>
          </div>
        </div>
        <div v-if="notifications">
          <div
            class="row table-body"
            v-for="(notif, i) in notifications"
            :key="i"
          >
            <div @click="showModal = !showModal" class="left">
              <p>+998 90 123-32-23</p>
              <p>
                <span>{{ notif.title_ru || "&#8212;" }}</span>
                {{ notif.body_ru }}
              </p>
              <p>
                <span>{{ getTime(notif.created_at) }}</span
                >{{ getDate(notif.created_at) }}
              </p>
              <p>
                <span>{{ getTime(notif.created_at) }}</span>
                {{ getDate(notif.created_at) }}
              </p>
            </div>
            <div class="right">
              <router-link
                :to="{
                  name: 'editNotification',
                  params: { id: notif.id || 1 },
                }"
              >
                <img
                  src="@/assets/images/icons/edit-small.svg"
                  alt="edit"
                  style="background: #edf7ff"
                />
                Изменить
              </router-link>
              <p @click="deleteHandler(notif.id) || 1">
                <img
                  src="@/assets/images/icons/trash.svg"
                  alt="trash"
                  style="background: #ffeded"
                />
                Удалить
              </p>
            </div>
            <div v-show="showModal" class="modal">
              <img
                src="@/assets/images/icons/datepicker-close.svg"
                class="close"
                alt="close"
                @click="showModal = false"
              />
              <h3>Изображение</h3>
              <img
                src="@/assets/images/icons/banner-4.png"
                alt="banner"
                class="banner-img"
              />
              <h3>{{ notif.title_ru }}</h3>
              <p>{{ notif.body_ru }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!notifications" class="no-data">Результаты не найдены.</div>
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
    const showModal = ref(false);

    onMounted(() => {
      moment.locale("ru");
      store.dispatch("fetchNotifications");
    });
    const filterPage = value => {
      console.log(value);
    };

    // -------------- Time and Date --------------
    const getTime = time => {
      return moment(Date.parse(time)).format("LT");
    };
    const getDate = date => {
      return moment(Date.parse(date)).format("L");
    };

    // -------------- Delete Notif --------------
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
      store.dispatch("notification/deleteNotificationById", deletedId.value);
    };
    return {
      filterPage,
      showModal,
      okHandler,
      getTime,
      getDate,
      notification,
      cancelHandler,
      deleteHandler,
      notifications: computed(
        () => store.getters["notification/getNotificationList"]
      ),
    };
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  position: relative;

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
      width: 250px;
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
      min-width: 1500px;
      width: 100%;
      height: auto;
      padding: 30px 32px;
      background: #ffffff;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
      border-radius: 20px;
      .row {
        text-decoration: none;
        width: 100%;
        margin: 8px 0px;
        display: flex;
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
        border-radius: 15px;

        .left {
          width: 75%;
          display: flex;
          align-items: center;
          p {
            font-weight: 400;
            font-size: 16px;
            color: #93928e;
            width: 23%;
            &:nth-child(2) {
              width: 31%;
            }
          }
        }

        .right {
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      }
      .table-header {
        padding: 30px 25px;
        background: #ebf5ff;
        .left,
        .right {
          p {
            font-weight: 600;
            color: #383838;
          }
        }
      }
      .table-body {
        cursor: pointer;
        padding: 20px 25px;
        background: #ffffff;

        .left {
          p {
            display: flex;
            align-items: center;

            &:first-child {
              font-weight: 600;
              font-size: 16px;
              color: #51aafd;
            }
            &:nth-child(2) {
              display: flex;
              flex-direction: column;
              align-items: flex-start;

              span {
                margin-bottom: 5px;
              }
            }
            span {
              font-weight: bold;
              color: #383838;
              margin-right: 5px;
            }
          }
        }
        .right {
          a,
          p {
            display: flex;
            cursor: pointer;
            align-items: center;
            text-decoration: none;

            img {
              border-radius: 10px;
              margin-right: 0.7rem;
              padding: 8px;
            }
          }
          a {
            color: #51aafd;
          }
          p {
            color: #ec6464cc;
          }
        }
      }
    }
  }
  .modal {
    position: absolute;
    top: 20%;
    left: 20%;
    padding: 30px;
    border-radius: 10px;
    background: #ffffff;
    text-align: center;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);

    .close {
      position: absolute;
      top: 20px;
      right: 20px;
      width: 20px;
      cursor: pointer;
    }
    h3 {
      font-weight: 600;
      font-size: 17px;
      color: #383838;
      margin: 1rem 0;
    }
    p {
      width: 360px;
      font-size: 16px;
      color: #a4a4a4;
      letter-spacing: 0.2px;
    }
  }
}
</style>
