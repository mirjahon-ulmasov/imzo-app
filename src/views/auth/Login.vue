<template>
  <div class="container">
    <div class="main-content">
      <img src="~@/assets/images/logo.png" alt="Logo" />
      <label class="custom-label" for="">Номер телефона:</label>
      <input class="custom-input" type="text" />
      <label class="custom-label" for="">Пароль:</label>
      <input class="custom-input" type="text" />
      <div class="row">
        <a class="forget-password-btn" href="">Забыл пароль?</a>
        <label for=""
          ><input value="" type="checkbox" />
          <p>Запомнить меня</p></label
        >
      </div>
      <button type="submit">Войти</button>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
  methods: {},
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
    img {
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
      width: 100%;
      height: 55px;
      outline: none;
      padding-left: 16px;
      background: #ffffff;
      border: 0.5px solid #d0d4d9;
      box-sizing: border-box;
      border-radius: 10px;
      font-style: normal;
      font-weight: normal;
      font-size: 18px;
      line-height: 172.34%;
      color: #93928e;
    }
    .row {
      margin: 24px 0px;
      .forget-password-btn {
        float: right;
        text-decoration: none;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 172.34%;
        color: #93928e;
      }
      label {
        cursor: pointer;
        input[type="checkbox"] {
          float: left;
          width: 16px;
          height: 16px;
          background: #ffffff;
          border: 1px solid #dcdcdc;
          box-sizing: border-box;
          border-radius: 5px;
        }
        p {
          font-style: normal;
          font-weight: normal;
          font-size: 16px;
          line-height: 172.34%;
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
