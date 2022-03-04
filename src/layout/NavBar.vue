<template>
  <div class="nav-bar">
    <div class="nav-left">
      <h3>{{ title }}</h3>
      <img
        :src="
          require(`@/assets/images/icons/${
            link === 'inbox'
              ? 'notifications-bold-blue.svg'
              : link.concat('-bold-blue.svg')
          }`)
        "
        alt="icon"
      />
    </div>
    <div class="nav-right">
      <img
        v-if="link !== 'inbox'"
        src="@/assets/images/icons/notifications-new.svg"
        alt="notif"
        @click="router.push('/inbox')"
      />
      <img
        @click="isShow = !isShow"
        src="@/assets/images/icons/users-light-blue.svg"
        class="user-img"
        alt="profile"
      />
      <div class="dropdown animate__animated animate__fadeInDown" v-if="isShow">
        <button @click="changeLangHandler()">
          <img
            :src="
              require(`@/assets/images/icons/${
                language === 'ru' ? 'ru' : 'uz'
              }.svg`)
            "
            alt="Flag"
          />
          Сменить язык
        </button>
        <button @click="logoutHandler()">
          <img src="@/assets/images/icons/logout.svg" alt="Logout" />
          Выйти из аккаунта
        </button>
      </div>
      <div class="user-details">
        <h4>Amal Bashirov</h4>
        <p>Administrator</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  props: ["title"],
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const language = ref(
      localStorage.getItem("lang") ? localStorage.getItem("lang") : "ru"
    );
    const isShow = ref(false);

    const logoutHandler = () => {
      store.dispatch("logout");
      router.push("/login");
    };

    const changeLangHandler = () => {
      if (language.value === "ru") {
        localStorage.setItem("lang", "uz");
        language.value = "uz";
      } else {
        localStorage.setItem("lang", "ru");
        language.value = "ru";
      }
    };

    return {
      isShow,
      router,
      language,
      logoutHandler,
      changeLangHandler,
      link: computed(() => route.meta.link),
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px 15px 0px;
  background: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03);

  .nav-left {
    padding-left: 40px;
    border-left: 3px solid #51aafd;
    display: flex;
    align-items: center;

    h3 {
      font-weight: 600;
      font-size: 22px;
      color: #383838;
    }

    img {
      width: 1.6rem;
      margin-left: 10px;
    }
  }

  .nav-right {
    display: flex;
    position: relative;
    align-items: center;

    .dropdown {
      top: 4.5rem;
      padding: 20px;
      position: absolute;
      z-index: 10;
      background: #ffffff;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
      border-radius: 10px;

      button {
        display: flex;
        border: none;
        font-size: 16px;
        align-items: center;
        background: transparent;

        img {
          margin-right: 1rem;
        }
        &:first-child {
          margin-bottom: 10px;
          color: #51aafd;
        }
        &:nth-child(2) {
          color: #ff8686;
        }
      }
    }

    img {
      cursor: pointer;
    }

    .user-img {
      padding: 13px;
      margin: 0 1.2rem;
      border-radius: 50%;
      background: #f4f4f4;
    }

    .user-details {
      font-family: Inter;
      h4 {
        font-weight: 600;
        font-size: 18px;
        line-height: 172.34%;
        color: #383838;
      }

      p {
        font-weight: normal;
        font-size: 16px;
        color: #51aafd;
      }
    }
  }
}
</style>
