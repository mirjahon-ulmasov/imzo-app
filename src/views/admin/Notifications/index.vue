<template>
  <p>
    <span>Уведомления</span>
    <img src="@/assets/images/icons/arrow-right.svg" alt="arrow" />
    Конструктор уведомлений
  </p>
  <h3>Конструктор уведомлений</h3>
  <div class="main">
    <div class="left">
      <form>
        <div class="input-form">
          <h4>Загрузка изображения</h4>
          <div
            class="image-input"
            :style="{
              background: `linear-gradient(
                7deg,
                rgba(255, 255, 255, 0.5) 25%,
                rgba(255, 255, 255, 0.5) 100%
              ),
              url(${
                imgPreview
                  ? imgPreview
                  : require('@/assets/images/icons/banner-4.png')
              })`,
            }"
          >
            <label>
              <img src="@/assets/images/icons/camera.svg" alt="camera" />
              <FileUpload @fileInput="fileInputHandler" />
            </label>
          </div>
        </div>
        <div class="input-form">
          <h4>Точка отправления</h4>
          <label class="container">
            <p>Пол</p>
            <input type="radio" checked="checked" name="radio" />
            <span class="checkmark"></span>
          </label>
          <label class="container">
            <p>Регион</p>
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
          </label>
          <label class="container">
            <p>Город</p>
            <input type="radio" name="radio" />
            <span class="checkmark"></span>
          </label>
          <v-select
            style="margin-top: 2rem"
            @input="getCity"
            :options="[
              { title: 'Товар', value: 'product' },
              { title: 'Отзывы', value: 'reviews' },
              { title: 'Замер', value: 'measurement' },
            ]"
          ></v-select>
          <v-select
            style="margin-top: 1rem"
            @input="getCity"
            :options="[
              { title: 'Товар', value: 'product' },
              { title: 'Отзывы', value: 'reviews' },
              { title: 'Замер', value: 'measurement' },
            ]"
          ></v-select>
        </div>
        <div class="input-form">
          <h4>План отправления уведомления</h4>
          <div class="date">
            <input type="time" />
            <input type="date" />
          </div>
        </div>
        <div class="actions">
          <button
            style="padding: 13px 15px"
            @click.prevent="setActiveLang('ru')"
            :class="{ active: isActiveLang('ru') }"
          >
            Ru
          </button>
          <button
            style="padding: 13px 15px"
            @click.prevent="setActiveLang('uz')"
            :class="{ active: isActiveLang('uz') }"
          >
            Uz
          </button>
        </div>
        <div v-show="isActiveLang('ru')">
          <div class="input-form" style="margin-top: 1rem">
            <h4>Заголовок уведомления</h4>
            <input type="text" placeholder="Введите" />
          </div>
          <div class="input-form">
            <h4>Текст уведомления</h4>
            <textarea type="text" placeholder="Введите" rows="8" />
          </div>
        </div>
        <div v-show="isActiveLang('uz')">
          <div class="input-form" style="margin-top: 1rem">
            <h4>Bildirishnoma sarlavhasi</h4>
            <input type="text" placeholder="Kiriting" />
          </div>
          <div class="input-form">
            <h4>Bildirishnoma matni</h4>
            <textarea type="text" placeholder="Kiriting" rows="8" />
          </div>
        </div>
        <button type="submit" class="form-btn">Сохранить</button>
      </form>
    </div>
    <div class="right">
      <div class="sample">
        <div class="top">
          <img src="@/assets/images/logo-small.png" alt="logo" />
          <p>24.12.2021 16:48</p>
        </div>
        <img
          :src="
            imgPreview
              ? imgPreview
              : require('@/assets/images/icons/banner-4.png')
          "
          alt="banner"
          class="banner-img"
        />
        <h4>Ваш подарок ждет вас!🎉🎁</h4>
        <p>Вы получили 3% скидку на весь ассортимент товаров🛍</p>
        <p v-show="fullBanner">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cursus
          ultrices massa massa, diam scelerisque molestie consectetur. Ornare
          sit tellus etiam lacus, volutpat diam id blandit a. Vel tellus
          pellentesque id faucibus fringilla morbi sapien. Magna in a diam
          proin.
        </p>
        <div style="text-align: center; margin-top: 20px">
          <img
            :src="
              fullBanner
                ? require('@/assets/images/icons/arrow-up.svg')
                : require('@/assets/images/icons/arrow-down.svg')
            "
            alt="arrow"
            @click="fullBanner = !fullBanner"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    const activeTab = ref("welcome");
    const activeLang = ref("ru");
    const fullBanner = ref(true);

    const setActiveTab = item => (activeTab.value = item);
    const isActiveTab = item => activeTab.value === item;

    const setActiveLang = item => (activeLang.value = item);
    const isActiveLang = item => activeLang.value === item;

    return {
      setActiveTab,
      isActiveTab,
      setActiveLang,
      isActiveLang,
      activeTab,
      activeLang,
      fullBanner,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  display: flex;
  font-size: 18px;
  color: #93928e;
  align-items: center;

  span {
    color: #51aafd;
  }
}

h3 {
  font-weight: 600;
  font-size: 22px;
  color: #383838;
  margin-top: 3rem;
}
.main {
  display: flex;
  justify-content: space-between;
  .left {
    width: 50%;
    form {
      .input-form {
        margin-top: 2rem;
        h4 {
          font-weight: 600;
          font-size: 20px;
          color: #383838;
          margin-bottom: 1rem;
        }

        .date {
          width: 400px;
          display: flex;
          justify-content: space-between;

          input[type="time"] {
            width: 95px;
            font-size: 18px;
            color: #51aafd;
            padding: 0;
            text-align: center;

            &::-webkit-calendar-picker-indicator {
              background: none;
              display: none;
            }
            &::-webkit-datetime-edit-hour-field {
              background: #ebf5ff;
              color: #51aafd;
            }
            &::-webkit-datetime-edit-minute-field {
              background: #ebf5ff;
              color: #51aafd;
            }
            &::-webkit-datetime-edit-text {
              padding: 0 5px;
            }
          }
          input[type="date"] {
            width: 290px;
            font-size: 18px;
            color: #51aafd;

            &::-webkit-calendar-picker-indicator {
              background: none;
              display: none;
            }
          }
        }

        .container {
          p {
            font-weight: 500;
            font-size: 16px;
            color: #383838;
          }
        }

        .image-input {
          width: 295px;
          height: 136px;
          border-radius: 10px;

          img {
            top: 40px;
            left: 40%;
          }
        }

        textarea,
        input {
          font-size: 16px;
        }
      }
      .actions {
        margin-top: 3rem;

        button {
          padding: 13px 24px;
          border: none;
          margin-right: 1rem;
          font-size: 18px;
          color: #383838;
          font-weight: 400;
          border-radius: 10px;
          background: #ffffff;
          box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
          transition: 0.2s;

          &.active {
            color: #ffffff;
            background: #51aafd;
            box-shadow: 0px 5px 20px transparent;
          }
        }
      }

      .form-btn {
        margin-top: 2rem;
      }
    }
  }
  .right {
    width: 42%;
    .sample {
      width: 335px;
      max-height: 600px;
      background: #ffffff;
      box-shadow: 0px 0px 2px rgba(69, 69, 69, 0.25);
      border-radius: 20px;
      padding: 20px;
      overflow-y: scroll;
      cursor: pointer;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 95px;
          height: 34px;
        }
        p {
          font-size: 16px;
          color: #8e8e8e;
        }
      }
      .banner-img {
        width: 295px;
        height: 136px;
        margin: 10px 0;
      }
      h4 {
        font-weight: 600;
        font-size: 18px;
        color: #383838;
        letter-spacing: 0.02em;
      }
      p {
        font-size: 16px;
        color: #a4a4a4;
        margin-top: 10px;
      }
    }
  }
}
</style>
