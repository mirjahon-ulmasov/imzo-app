<template>
  <div class="banner">
    <h3>Количество карточек</h3>
    <div class="actions">
      <button
        style="background: #edf7ff"
        @click="
          catalogs.push({
            img: '',
            text_ru: '',
            text_uz: '',
            category: '',
            subcategory: '',
          })
        "
      >
        <img src="../../../assets/images/icons/plus-icon.svg" alt="plus" />
      </button>
      <button style="background: #ffeded" @click="catalogs.pop()">
        <img src="@/assets/images/icons/trash.svg" alt="trash" />
      </button>
    </div>
    <div class="counts">
      <div
        v-for="(catalog, i) in catalogs"
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
        <form @submit.prevent="submitCatalog">
          <div class="input-form">
            <h4>Добавить изображение</h4>
            <div
              class="image-input"
              :style="{
                'background-image': `
              url(${
                imgPreview
                  ? imgPreview
                  : require('../../../assets/images/icons/banner-2.png')
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
            <h4>Текст каталога главной страницы</h4>
            <input
              type="text"
              placeholder="Введите"
              v-model="catalogs[activeIndex].text_ru"
            />
          </div>
          <div class="input-form" v-show="isActiveLang('uz')">
            <h4>Asosiy sahifa katalogi matni</h4>
            <input
              type="text"
              placeholder="Kiriting"
              v-model="catalogs[activeIndex].text_uz"
            />
          </div>
          <div class="input-form">
            <h4>Выбор категории</h4>
            <v-select
              @input="getCategory"
              :options="[
                { title: 'Товар', value: 'product' },
                { title: 'Отзывы', value: 'reviews' },
                { title: 'Замер', value: 'measurement' },
              ]"
            ></v-select>
          </div>
          <div class="input-form">
            <h4>Выбор подкатегории</h4>
            <v-select
              @input="getSubcategory"
              :options="[
                { title: 'Товар', value: 'product' },
                { title: 'Отзывы', value: 'reviews' },
                { title: 'Замер', value: 'measurement' },
              ]"
            ></v-select>
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
              'background-image': `
            url(${
              imgPreview
                ? imgPreview
                : require('../../../assets/images/icons/banner-2.png')
            })`,
            }"
          >
            <p>
              {{
                activeLang === "ru"
                  ? catalogs[activeIndex].text_ru !== ""
                    ? catalogs[activeIndex].text_ru
                    : "Алюминиевые окна"
                  : catalogs[activeIndex].text_uz !== ""
                  ? catalogs[activeIndex].text_uz
                  : "Alyuminiy oynalar"
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

    const catalogs = reactive([
      {
        img: "",
        text_ru: "",
        text_uz: "",
        category: "",
        subcategory: "",
      },
    ]);

    const getCategory = value => {
      catalogs[activeIndex.value].category = value;
    };

    const getSubcategory = value => {
      catalogs[activeIndex.value].subcategory = value;
    };

    // -------------- Image --------------
    const imgPreview = ref("");
    const fileInputHandler = ({ file, filePreview }) => {
      catalogs[activeIndex.value].img = file;
      imgPreview.value = filePreview;
    };

    const submitCatalog = () => {
      console.log(catalogs[activeIndex.value]);
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
      catalogs,
      imgPreview,
      activeIndex,
      isActiveLang,
      fileInputHandler,
      cancelHandler,
      setActiveIndex,
      isActiveIndex,
      submitCatalog,
      getCategory,
      getSubcategory,
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
          position: relative;
          width: 192px;
          height: 237px;
          border-radius: 30px;
          background-size: cover;
          background-color: #777;
          background-position: center;
          background-repeat: no-repeat;

          img {
            position: absolute;
            top: 90px;
            left: 35%;
            padding: 0.8rem;
            border-radius: 50%;
            opacity: 0.9;
            background: #ffffff;
            cursor: pointer;
          }
        }
      }
    }
  }

  .right {
    width: 35%;
    display: flex;
    justify-content: flex-start;
    .sample {
      margin-top: 1rem;
      width: 240px;
      height: 316px;
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
        width: 192px;
        height: 237px;
        display: flex;
        padding: 20px;
        margin-top: 20px;
        border-radius: 30px;
        background-size: cover;
        background-color: #383838;
        background-position: center;
        background-repeat: no-repeat;
        /* overflow: scroll; */

        p {
          align-self: flex-start;
          font-weight: 500;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
