<template>
  <div class="page">
    <form @submit.prevent="login()" class="main-content">
      <img class="logo" src="@/assets/images/logo.png" alt="Logo" />
      <label class="custom-label" for="">Электронная почта:</label>
      <div class="custom-input">
        <input v-model="user.email" type="email" />
      </div>
      <label class="custom-label" for="">Пароль:</label>
      <div class="custom-input">
        <img
          @click.prevent="isPassHide = !isPassHide"
          :src="
            require(`@/assets/images/icons/eye-${
              isPassHide ? 'close' : 'open'
            }.svg`)
          "
          alt=""
        />
        <input
          v-model="user.password"
          :type="isPassHide ? 'password' : 'text'"
        />
      </div>
      <div class="row">
        <label class="custom-checkbox" for="remember">
          <input v-model="user.remember_me" id="remember" type="checkbox" />
          <div class="checkbox-container">
            <span v-if="user.remember_me == true"></span>
          </div>
          <p>Запомнить меня</p>
        </label>
        <a class="forget-password-btn" href="">Забыл пароль?</a>
      </div>
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = ref({ email: "", password: "", remember_me: false });
    const isPassHide = ref(true);

    const login = () => {
      store.dispatch("login", user).then(() => router.push("/"));
    };

    return { user, isPassHide, login };
  },
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .main-content {
    width: 450px;
    display: flex;
    flex-direction: column;
    margin: auto;
    .logo {
      margin: 0px auto 2.5rem auto;
      width: 255px;
    }
    .custom-label {
      font-weight: 600;
      font-size: 20px;
      color: #383838;
      letter-spacing: 0.3px;
      margin: 24px 0px 16px 0px;
    }
    .custom-input {
      position: relative;
      img {
        position: absolute;
        top: calc(50% - 16px);
        right: 5%;
        cursor: pointer;
      }
      input {
        width: 100%;
        height: 55px;
        outline: none;
        background: #ffffff;
        border: 0.5px solid #d0d4d9;
        box-sizing: border-box;
        border-radius: 10px;
        letter-spacing: 1px;
        padding: 16px 20px;
        font-size: 18px;
        color: #93928e;
      }
    }
    .row {
      margin: 24px 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .forget-password-btn {
        text-decoration: none;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        letter-spacing: 0.7px;
        color: #93928e;
      }
      .custom-checkbox {
        position: relative;
        display: flex;
        cursor: pointer;
        align-items: center;

        input[type="checkbox"] {
          display: none;
          position: absolute;
          right: 0;
        }
        .checkbox-container {
          box-sizing: border-box;
          width: 26px;
          height: 26px;
          background: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 5px;
          position: relative;
          span {
            position: absolute;
            display: block;
            background: #51aafd;
            top: calc(50% - 6px);
            left: calc(50% - 6px);
            height: 12px;
            width: 12px;
            border-radius: 3px;
            border: none;
          }
        }
        p {
          margin-left: 16px;
          font-style: normal;
          font-weight: normal;
          letter-spacing: 0.7px;
          font-size: 16px;
          color: #93928e;
        }
      }
    }
    button {
      border: none;
      cursor: pointer;
      font-style: normal;
      font-weight: 600;
      font-size: 18px;
      line-height: 172.34%;
      color: #ffffff;
      width: 100%;
      height: 55px;
      background: #51aafd;
      border-radius: 10px;
    }
  }
}
</style>
