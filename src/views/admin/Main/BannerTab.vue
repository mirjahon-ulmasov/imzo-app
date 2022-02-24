<template>
  <div class="banner">
    <h3>Количество баннеров</h3>
    <div class="actions">
      <button
        style="background: #edf7ff"
        @click="
          banners.push({
            img: '',
            text_ru: '',
            text_uz: '',
            link: '',
          })
        "
      >
        <img src="@/assets/images/icons/plus-icon.svg" alt="plus" />
      </button>
      <button style="background: #ffeded" @click="banners.pop()">
        <img src="@/assets/images/icons/trash.svg" alt="trash" />
      </button>
    </div>
    <div class="counts">
      <div
        v-for="(banner, i) in banners"
        :key="i"
        @click="setActiveIndex(i)"
        class="count"
        :class="{ active: isActiveIndex(i) }"
      >
        {{ i + 1 }}
      </div>
    </div>
    <div style="display: flex; justify-content: space-between">
      <div class="left">
        <form @submit.prevent="submitBanner">
          <div class="input-form">
            <h4>Добавить изображение</h4>
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
                  : require('@/assets/images/icons/banner-1.png')
              })`,
              }"
            >
              <label>
                <img src="@/assets/images/icons/camera.svg" alt="camera" />
                <FileUpload @fileInput="fileInputHandler" />
              </label>
            </div>
          </div>
          <div class="input-form" v-show="isActiveLang('ru')">
            <h4>Текст заголовка</h4>
            <input
              type="text"
              placeholder="Акция Engelberg 7000"
              v-model="banners[activeIndex].text_ru"
            />
          </div>
          <div class="input-form" v-show="isActiveLang('uz')">
            <h4>Sarlavha matni</h4>
            <input
              type="text"
              placeholder="Engelberg 7000 aksiyasi"
              v-model="banners[activeIndex].text_uz"
            />
          </div>
          <div class="input-form">
            <h4>Ссылка</h4>
            <input
              type="text"
              placeholder="Введите"
              v-model="banners[activeIndex].link"
            />
          </div>
          <button type="submit" class="form-btn">Сохранить</button>
        </form>
      </div>
      <div class="right">
        <div class="sample">
          <h4>Пример <span>LIVE</span></h4>
          <div
            class="content"
            :style="{
              background: `linear-gradient(6.93deg, rgba(0, 0, 0, 0.2) 25.44%, rgba(0, 0, 0, 0) 107.17%),
            url(${
              imgPreview
                ? imgPreview
                : require('@/assets/images/icons/banner-1.png')
            })`,
            }"
          >
            <p>
              {{
                activeLang === "ru"
                  ? banners[activeIndex].text_ru !== ""
                    ? banners[activeIndex].text_ru
                    : "Акция Engelberg 7000"
                  : banners[activeIndex].text_uz !== ""
                  ? banners[activeIndex].text_uz
                  : "Engelberg 7000 aksiyasi"
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <notification
    header="Изменения сохранены"
    :isShow="notification.isShow"
    :is_success="notification.isSuccess"
    @cancel="cancelHandler"
  ></notification>
</template>

<script>
import FileUpload from "@/components/helpers/FileUpload.vue";
import { reactive, ref } from "vue";

export default {
  components: { FileUpload },
  props: {
    activeLang: {
      type: String,
      default: "ru",
    },
  },
  setup(props) {
    const activeIndex = ref(0);
    const isActiveLang = item => props.activeLang === item;
    const setActiveIndex = item => (activeIndex.value = item);
    const isActiveIndex = item => activeIndex.value === item;

    const banners = reactive([
      {
        img: "",
        text_ru: "",
        text_uz: "",
        link: "",
      },
    ]);

    const imgPreview = ref("");

    const fileInputHandler = ({ file, filePreview }) => {
      banners[activeIndex.value].img = file;
      imgPreview.value = filePreview;
    };

    const submitBanner = () => {
      console.log(banners[activeIndex.value]);
      notification.isShow = true;
      notification.isSuccess = true;
    };

    // -------------- Notifications --------------
    const notification = reactive({
      isShow: false,
      isSuccess: false,
    });
    const cancelHandler = () => {
      notification.isShow = false;
    };

    return {
      notification,
      banners,
      imgPreview,
      activeIndex,
      isActiveLang,
      fileInputHandler,
      cancelHandler,
      setActiveIndex,
      isActiveIndex,
      submitBanner,
    };
  },
};
</script>

<style lang="scss" scoped>
.banner {
  h3 {
    font-weight: 600;
    font-size: 22px;
    color: #383838;
    margin-right: 1rem;
    display: inline-block;
  }
  .actions {
    display: inline-block;
    button {
      margin-right: 1rem;
      border-radius: 10px;
      border: none;
      cursor: pointer;
      padding: 8px 10px;

      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .counts {
    width: 50%;
    margin-top: 1rem;

    .count {
      display: inline-block;
      padding: 10px;
      text-align: center;
      width: 42px;
      height: 42px;
      margin: 0 15px 15px 0;
      border-radius: 10px;
      font-weight: 500;
      font-size: 18px;
      color: #383838;
      background: #ffffff;
      border: 0.5px solid #d0d4d9;
    }
    .active {
      color: #ffffff;
      background: #51aafd;
      border-color: #51aafd;
    }
  }

  .left {
    form {
      .input-form {
        margin: 1rem 0 2rem 0;
        h4 {
          font-weight: 600;
          font-size: 20px;
          color: #383838;
          margin-bottom: 1rem;
        }
        .image-input {
          width: 300px;
          height: 170px;
          border-radius: 20px;

          img {
            top: 55px;
            left: 40%;
          }
        }
      }
    }
  }

  .right {
    .sample {
      width: 350px;
      height: 250px;
      background: #e5f3ff;
      border-radius: 10px;
      padding: 16px 24px;
      cursor: pointer;

      h4 {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        color: #383838;

        span {
          color: #51aafd;
          font-size: 22px;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .content {
        width: 300px;
        height: 170px;
        display: flex;
        padding: 15px;
        margin-top: 20px;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        /* overflow: scroll; */

        p {
          align-self: flex-end;
          font-weight: 500;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
