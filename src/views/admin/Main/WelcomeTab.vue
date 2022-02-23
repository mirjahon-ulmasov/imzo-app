<template>
  <div class="welcome">
    <div class="left">
      <h3>Текст приветствия</h3>
      <form @submit.prevent="submitWelcome">
        <div v-show="isActiveLang('ru')">
          <div class="input-form">
            <h4>Заголовок</h4>
            <input
              type="text"
              v-model="welcome.title_ru"
              :placeholder="getWelcome ? getWelcome.title_ru : 'Заголовок'"
            />
          </div>
          <div class="input-form">
            <h4>Подзаголовок</h4>
            <input
              type="text"
              v-model="welcome.text_ru"
              :placeholder="getWelcome ? getWelcome.text_ru : 'Подзаголовок'"
            />
          </div>
        </div>
        <div v-show="isActiveLang('uz')">
          <div class="input-form">
            <h4>Sarlavha</h4>
            <input
              type="text"
              v-model="welcome.title_uz"
              :placeholder="getWelcome ? getWelcome.title_uz : 'Sarlavha'"
            />
          </div>
          <div class="input-form">
            <h4>Subtitr</h4>
            <input
              type="text"
              v-model="welcome.text_uz"
              :placeholder="getWelcome ? getWelcome.text_uz : 'Subtitr'"
            />
          </div>
        </div>
        <button type="submit" class="form-btn">Сохранить</button>
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
  <notification
    header="Изменения сохранены"
    :isShow="notification.isShow"
    :is_success="notification.isSuccess"
    @cancel="cancelHandler"
  ></notification>
</template>

<script>
import { reactive, onMounted, computed } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    activeLang: {
      type: String,
      default: "ru",
    },
  },
  setup(props) {
    const store = useStore();
    const isActiveLang = item => props.activeLang === item;

    onMounted(() => {
      store.dispatch("fetchWelcomeText");
    });

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
      props.activeLang === "ru"
        ? welcome.title_ru !== ""
          ? welcome.title_ru
          : getWelcome.value
          ? getWelcome.value.title_ru
          : "Заголовок"
        : welcome.title_uz !== ""
        ? welcome.title_uz
        : getWelcome.value
        ? getWelcome.value.title_uz
        : "Sarlavha"
    );

    const welcomeContent = computed(() =>
      props.activeLang === "ru"
        ? welcome.text_ru !== ""
          ? welcome.text_ru
          : getWelcome.value
          ? getWelcome.value.text_ru
          : "Подзаголовок"
        : welcome.text_uz !== ""
        ? welcome.text_uz
        : getWelcome.value
        ? getWelcome.value.text_uz
        : "Subtitr"
    );

    // -------------- Notifications --------------
    const notification = reactive({
      isShow: false,
      isSuccess: false,
    });
    const cancelHandler = () => {
      notification.isShow = false;
    };

    return {
      welcome,
      getWelcome,
      welcomeHeader,
      welcomeContent,
      notification,
      cancelHandler,
      isActiveLang,
      submitWelcome,
    };
  },
};
</script>

<style lang="scss" scoped>
.welcome {
  display: flex;
  justify-content: space-between;

  .left {
    h3 {
      font-weight: 600;
      font-size: 22px;
      color: #383838;
    }
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
</style>
