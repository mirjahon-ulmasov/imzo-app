<template>
  <div class="container">
    <form @submit.prevent="login()" class="main-content">
      <img class="logo" src="~@/assets/images/logo.png" alt="Logo" />
      <label class="custom-label" for="">Номер телефона:</label>
      <div class="custom-input">
        <span>+998</span>
        <input v-model="phone_number" type="text" />
      </div>
      <label class="custom-label" for="">Пароль:</label>
      <div class="custom-input">
        <img
          @click.prevent="showPassword"
          src="~@/assets/images/icons/View_hide_light.svg"
          alt=""
        />
        <input v-model="password" :type="type" />
      </div>
      <div class="row">
        <label class="custom-checkbox" for="remember">
          <input v-model="remember_me" id="remember" type="checkbox" />
          <div class="checkbox-container">
            <span v-if="remember_me == true"></span>
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
export default {
  data() {
    return {
      type: "password",
      phone_number: "",
      password: "",
      remember_me: false,
    };
  },
  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    async login() {
      let phone_number = this.phone_number;
      let password = this.password;
      let remember_me = this.remember_me;
      this.$store.dispatch("auth", { phone_number, password, remember_me });
    },
  },
  mounted() {
    console.log(this.$store);
  },
};
</script>

<style lang="scss" scoped>
.container {
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
      height: 89px;
    }
    .custom-label {
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 172.34%;
      color: #383838;
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
      span {
        position: absolute;
        top: calc(50% - 10px);
        left: 20px;
        font-size: 18px;
        color: #93928e;
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
        font-size: 18px;
        line-height: 40px;
        color: #93928e;
      }
      &:nth-child(3) {
        input {
          padding-left: 70px;
        }
      }
      &:nth-child(5) {
        input {
          padding-left: 16px;
        }
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
          width: 24px;
          height: 24px;
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
