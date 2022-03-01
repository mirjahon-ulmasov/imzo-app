<template>
  <div v-if="isShow" class="background" @click="handlerCancel()">
    <div class="notification">
      <img
        v-show="is_success"
        src="@/assets/images/icons/datepicker-close.svg"
        class="close"
        alt="close"
        @click="handlerCancel()"
      />
      <h3>{{ header }}</h3>
      <p>{{ content }}</p>
      <img
        v-show="is_success"
        src="@/assets/images/icons/tick.svg"
        alt="tick"
      />
      <div class="actions" v-show="!is_success">
        <button @click="handlerOk()">Да</button>
        <button @click="handlerCancel()">Отменить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    is_success: {
      type: Boolean,
      default: false,
    },
    header: {
      type: String,
      default: "",
    },
    content: {
      type: String,
      default: "",
    },
  },
  setup(props, context) {
    const handlerOk = () => context.emit("ok");
    const handlerCancel = () => context.emit("cancel");

    return { handlerOk, handlerCancel };
  },
};
</script>

<style lang="scss" scoped>
.background {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #7fdbff27;
  z-index: 10;

  .notification {
    display: inline-block;
    position: relative;
    margin: 18% 30%;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    padding: 30px 75px;
    box-shadow: 0px 5px 20px 1px rgba(0, 0, 0, 0.1);

    * {
      margin-top: 20px;
    }

    .close {
      position: absolute;
      top: 0px;
      right: 20px;
      width: 17px;
      cursor: pointer;
    }

    h3 {
      font-weight: 600;
      font-size: 20px;
      color: #383838;
    }

    p {
      font-size: 18px;
      line-height: 23px;
      color: #93928e;
      width: 350px;
      margin: 20px auto;
    }

    .actions {
      button {
        border-radius: 10px;
        font-size: 18px;
        line-height: 23px;
        text-align: center;
        letter-spacing: 0.02em;
        padding: 10px 40px;
        margin: 0 12px;
        border: none;
        cursor: pointer;
        transition: 0.2s;

        &:first-child {
          background: #ff8787;
          color: #ffffff;
        }
        &:nth-child(2) {
          background: #ffffff;
          border: 0.5px solid #d0d4d9;
          color: #383838;
        }
      }
    }
  }
}
</style>
