<template>
  <p>
    <span>Уведомления</span>
    <img src="@/assets/images/icons/arrow-right.svg" alt="arrow" />
    Конструктор уведомлений
  </p>
  <h3>Конструктор уведомлений</h3>
  <div class="main">
    <div class="left">
      <form @submit.prevent="submitBanner">
        <div class="input-form">
          <h4>Загрузка изображения</h4>
          <div
            class="image-input"
            :style="{
              'background-image': `linear-gradient(
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
            <input type="radio" value="gender" v-model="banner.destination" />
            <span class="checkmark"></span>
          </label>
          <label class="container">
            <p>Регион</p>
            <input type="radio" value="region" v-model="banner.destination" />
            <span class="checkmark"></span>
          </label>
          <label class="container">
            <p>Город</p>
            <input type="radio" value="city" v-model="banner.destination" />
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
            <input type="time" v-model="banner.time" />
            <input type="date" v-model="banner.date" />
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
            <input
              type="text"
              placeholder="Введите"
              v-model="banner.title_ru"
            />
          </div>
          <div class="input-form">
            <h4>Текст уведомления</h4>
            <textarea
              type="text"
              rows="8"
              placeholder="Введите"
              v-model="banner.text_ru"
            />
          </div>
        </div>
        <div v-show="isActiveLang('uz')">
          <div class="input-form" style="margin-top: 1rem">
            <h4>Bildirishnoma sarlavhasi</h4>
            <input
              type="text"
              placeholder="Kiriting"
              v-model="banner.title_uz"
            />
          </div>
          <div class="input-form">
            <h4>Bildirishnoma matni</h4>
            <textarea
              type="text"
              rows="8"
              placeholder="Kiriting"
              v-model="banner.text_uz"
            />
          </div>
        </div>
        <button type="submit" class="form-btn">Сохранить</button>
      </form>
    </div>
    <div class="right">
      <div class="sample">
        <div class="top">
          <img src="@/assets/images/logo-small.png" alt="logo" />
          <p>
            {{ banner.date !== "" ? banner.date : "24.12.2021" }}
            {{ banner.time !== "" ? banner.time : "16:48" }}
          </p>
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
        <h4>
          {{
            activeLang === "ru"
              ? banner.title_ru !== ""
                ? banner.title_ru
                : "Ваш подарок ждет вас!🎉🎁. Вы получили 3% скидку на весь ассортимент товаров🛍"
              : banner.title_uz !== ""
              ? banner.title_uz
              : "Sovg'angiz sizni kutmoqda!🎉🎁. Siz butun mahsulot assortimentiga 3% chegirmaga ega bo'ldingiz🛍"
          }}
        </h4>
        <p v-show="fullBanner">
          {{
            activeLang === "ru"
              ? banner.text_ru !== ""
                ? banner.text_ru
                : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non at incidunt iste aut fugit sed quas aspernatur dolorum ipsam eius quam, dicta illo debitis. Officiis consequuntur ipsam commodi distinctio sunt."
              : banner.text_uz !== ""
              ? banner.text_uz
              : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Non at incidunt iste aut fugit sed quas aspernatur dolorum ipsam eius quam, dicta illo debitis. Officiis consequuntur ipsam commodi distinctio sunt."
          }}
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
  <notification
    :header="notification.header"
    :isShow="notification.isShow"
    :is_success="notification.isSuccess"
    @cancel="cancelHandler"
  ></notification>
</template>

<script>
import { ref } from "vue";
import FileUpload from "@/components/helpers/FileUpload.vue";
export default {
  components: { FileUpload },
  props: ["id"],
  setup(props) {
    const activeLang = ref("ru");
    const fullBanner = ref(true);
    const banner = ref({
      destination: "gender",
      image: "",
      time: "",
      date: "",
      title_ru: "",
      text_ru: "",
      title_uz: "",
      text_uz: "",
    });

    const setActiveLang = item => (activeLang.value = item);
    const isActiveLang = item => activeLang.value === item;

    const submitBanner = () => {
      console.log(banner.value);
      if (props.id) {
        notification.value = {
          isShow: true,
          isSuccess: true,
          header: "Уведомление запланированно",
        };
      } else {
        notification.value = {
          isShow: true,
          isSuccess: true,
          header: "Уведомление изменено",
        };
      }
    };

    // -------------- Image --------------
    const imgPreview = ref("");
    const fileInputHandler = ({ file, filePreview }) => {
      imgPreview.value = filePreview;
      banner.value.image = file;
    };

    // -------------- Notifications --------------
    const notification = ref({
      header: "",
      isShow: false,
      isSuccess: false,
    });
    const cancelHandler = () => {
      notification.value.isShow = false;
    };

    return {
      setActiveLang,
      isActiveLang,
      activeLang,
      fullBanner,
      imgPreview,
      fileInputHandler,
      submitBanner,
      banner,
      notification,
      cancelHandler,
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
