<template>
  <div class="main-content" v-if="$route.path === '/notifications'">
    <h3>Уведомления</h3>
    <div class="actions">
      <router-link :to="{ name: 'addNotification' }" class="btn">
        <img src="@/assets/images/icons/plus-small.svg" alt="showroom" />
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
          <p>Точка отправления</p>
          <p>Текст заголовка</p>
          <p>План отправления</p>
          <p>Дата создания</p>
          <p>Редактировать</p>
        </div>
        <div class="row table-body" @click.self="showModal = !showModal">
          <p>+998 90 123-32-23</p>
          <p>
            <span>Ваш подарок ждет вас!🎉🎁</span>
            Вы получили 3% скидку на весь ассортимент товаров🛍
          </p>
          <p><span>14:55</span> 19.11.2022</p>
          <p><span>13:44</span> 26.01.2022</p>
          <p>
            <router-link :to="{ name: 'editNotification', params: { id: 1 } }">
              <img
                src="@/assets/images/icons/edit-small.svg"
                alt="edit"
                style="background: #edf7ff"
              />
              Изменить
            </router-link>
          </p>
          <p>
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
      <h3>Текст уведомления</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus ultrices
        massa massa, diam scelerisque molestie consectetur. Ornare sit tellus
        etiam lacus, volutpat diam id blandit a. Vel tellus pellentesque id
        faucibus fringilla morbi sapien. Magna in a diam proin.
      </p>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const showModal = ref(false);
    const filterPage = value => {
      console.log(value);
    };
    return { filterPage, showModal };
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
        p {
          font-weight: 400;
          font-size: 16px;
          color: #93928e;
          &:nth-child(1),
          &:nth-child(3),
          &:nth-child(4) {
            width: 17%;
          }
          &:nth-child(2) {
            width: 22%;
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
        cursor: pointer;
        padding: 20px 25px;
        background: #ffffff;

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
          &:nth-child(5) {
            width: 12%;
            a {
              display: flex;
              color: #51aafd;
              cursor: pointer;
              align-items: center;
              text-decoration: none;
            }
          }
          &:last-child {
            width: 12%;
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
