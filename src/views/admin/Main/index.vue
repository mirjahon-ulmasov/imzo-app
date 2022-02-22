<template>
  <div class="main-content">
    <h3>Редактирование</h3>
    <div class="actions">
      <button
        @click.prevent="setActiveTab('welcome')"
        :class="{ active: isActiveTab('welcome') }"
      >
        Текст приветствия
      </button>
      <button
        @click.prevent="setActiveTab('banner')"
        :class="{ active: isActiveTab('banner') }"
      >
        Рекламные баннера
      </button>
      <button
        @click.prevent="setActiveTab('catalog')"
        :class="{ active: isActiveTab('catalog') }"
      >
        Каталог главной страницы
      </button>
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

    <div class="welcome" v-if="isActiveTab('welcome')">
      <div class="left">
        <h3>Текст приветствия</h3>
        <form @submit.prevent="submitWelcome">
          <div v-show="isActiveLang('ru')">
            <div class="input-form">
              <h4>Заголовок</h4>
              <input
                type="text"
                v-model="welcome.title_ru"
                :placeholder="getWelcome.title_ru"
              />
            </div>
            <div class="input-form">
              <h4>Подзаголовок</h4>
              <input
                type="text"
                v-model="welcome.text_ru"
                :placeholder="getWelcome.text_ru"
              />
            </div>
          </div>
          <div v-show="isActiveLang('uz')">
            <div class="input-form">
              <h4>Sarlavha</h4>
              <input
                type="text"
                v-model="welcome.title_uz"
                :placeholder="getWelcome.title_uz"
              />
            </div>
            <div class="input-form">
              <h4>Subtitr</h4>
              <input
                type="text"
                v-model="welcome.text_uz"
                :placeholder="getWelcome.text_uz"
              />
            </div>
          </div>
          <div class="actions">
            <button type="submit" class="active">Сохранить</button>
          </div>
        </form>
      </div>
      <div class="right">
        <div class="sample">
          <h4>Пример <span>LIVE</span></h4>
          <div class="content">
            <h4>{{ welcomeHeader }}</h4>
            <p>{{ welcomeContent }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="banner" v-if="isActiveTab('banner')">
      <div class="left">
        <h3>Количество баннеров</h3>
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
            <img src="../../../assets/images/icons/plus-icon.svg" alt="plus" />
          </button>
          <button style="background: #ffeded" @click="banners.pop()">
            <img src="@/assets/images/icons/trash.svg" alt="trash" />
          </button>
        </div>
        <form @submit.prevent="submitBanner">
          <div class="input-form">
            <h4>Добавить изображение</h4>
            <div
              class="image-input"
              :style="{
                background: `linear-gradient(
                6.93deg,
                rgba(255, 255, 255, 0.507) 25%,
                rgba(255, 255, 255, 0.397) 100%
              ),
              url(${
                imgPreview
                  ? imgPreview
                  : require('../../../assets/images/icons/banner-1.png')
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
          <div class="actions">
            <button type="submit" class="active">Сохранить</button>
          </div>
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
                : require('../../../assets/images/icons/banner-1.png')
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
import { reactive, ref, onMounted, computed } from "vue";
import FileUpload from "@/components/helpers/FileUpload.vue";
import { useStore } from "vuex";
export default {
  components: { FileUpload },
  setup() {
    const store = useStore();
    const activeTab = ref("welcome");
    const activeLang = ref("ru");

    const setActiveTab = item => (activeTab.value = item);
    const isActiveTab = item => activeTab.value === item;

    const setActiveLang = item => (activeLang.value = item);
    const isActiveLang = item => activeLang.value === item;

    onMounted(() => {
      store.dispatch("fetchWelcomeText");
    });

    // -------------- Welcom Tab --------------
    const welcome = reactive({
      title_uz: "",
      title_ru: "",
      text_uz: "",
      text_ru: "",
    });

    const submitWelcome = () => {
      store
        .dispatch("createWelcomeText", welcome)
        .then(response => response.data)
        .then(data => {
          if (data.success) {
            notification.isShow = true;
            notification.isSuccess = true;
          }
        })
        .catch(err => {
          if (!err.response.data.success) {
            notification.isShow = true;
            notification.isSuccess = false;
          }
        });
    };

    const getWelcome = computed(() => store.getters.getWelcome);

    const welcomeHeader = computed(() =>
      activeLang.value === "ru"
        ? welcome.title_ru !== ""
          ? welcome.title_ru
          : getWelcome.value.title_ru
        : welcome.title_uz !== ""
        ? welcome.title_uz
        : getWelcome.value.title_uz
    );

    const welcomeContent = computed(() =>
      activeLang.value === "ru"
        ? welcome.text_ru !== ""
          ? welcome.text_ru
          : getWelcome.value.text_ru
        : welcome.text_uz !== ""
        ? welcome.text_uz
        : getWelcome.value.text_uz
    );

    // -------------- Banner Tab --------------
    const activeIndex = ref(0);
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
      setActiveTab,
      isActiveTab,
      setActiveLang,
      isActiveLang,
      activeTab,
      activeLang,
      submitWelcome,
      welcome,
      getWelcome,
      welcomeHeader,
      welcomeContent,
      fileInputHandler,
      cancelHandler,
      notification,
      banners,
      imgPreview,
      activeIndex,
      setActiveIndex,
      isActiveIndex,
      submitBanner,
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

  .actions {
    margin: 1.5rem 0;

    button {
      padding: 13px 24px;
      margin: 0 24px 15px 0;
      border: none;
      font-size: 18px;
      color: #383838;
      font-weight: 400;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
      transition: 0.2s;
    }
    .active {
      color: #ffffff;
      background: #51aafd;
      box-shadow: 0px 5px 20px transparent;
    }
  }
  .welcome,
  .banner {
    display: flex;
    justify-content: space-between;

    .left {
      form {
        .input-form {
          margin: 2rem 0;

          h4 {
            font-weight: 500;
            font-size: 20px;
            color: #383838;
            margin-bottom: 1rem;
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
          margin-top: 20px;
          padding: 24px 18px;
          width: 300px;
          height: 170px;
          background: #ffffff;
          border-radius: 10px;
          /* overflow: scroll; */

          h4 {
            text-align: start;
            line-height: 30px;
          }

          p {
            font-size: 18px;
            margin-top: 10px;
            line-height: 149.84%;
            color: #b7b7b7;
          }
        }
      }
    }
  }
  .banner {
    .left {
      .counts {
        margin-top: 10px;

        .count {
          display: inline-block;
          padding: 10px;
          text-align: center;
          width: 42px;
          height: 42px;
          margin: 5px 15px 15px 0;
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

        button {
          margin-right: 15px;
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
            width: 300px;
            height: 170px;
            border-radius: 20px;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;

            img {
              position: absolute;
              top: 55px;
              left: 40%;
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
      .sample {
        .content {
          display: flex;
          padding: 15px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;

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
}
</style>
