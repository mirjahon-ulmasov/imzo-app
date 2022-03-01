<template>
  <button
    @click="isCross = !isCross"
    :class="
      isCross
        ? 'btn btn-nav js-nav-toggler'
        : 'btn btn-nav js-nav-toggler btn-nav--open'
    "
  >
    <span class="sr-only"></span> <span class="nav-dots"></span>
  </button>
  <div v-if="!isCross" class="action-btn">
    <img src="~@/assets/images/icons/small-edit-icon.svg" alt="" />
    <p>Изменить</p>
  </div>
  <div v-if="!isCross" class="action-btn">
    <img src="~@/assets/images/icons/clarity_trash-line.svg" alt="" />
    <p>Удалить</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCross: true,
    };
  },
};
</script>
<style lang="scss" scoped>
// variables
$btn-nav-background: #fff;
$dot-size: 5px;
$dot-border-radius: $dot-size / 2;
$dot-color: #51aafd;

* {
  -webkit-backface-visibility: hidden;
}

div {
  transform: translate3d(0px, 0px, 0px);
}
.action-btn {
  cursor: pointer;
  width: 9rem;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  margin-bottom: 16px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    padding: 8px;
    background: #edf7ff;
  }
  p {
    margin-left: 1rem;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 172.34%;
    color: #51aafd;
  }
  &:nth-child(3) {
    img {
      background: #ffeded;
    }
    p {
      color: rgba(255, 0, 0, 0.2);
    }
  }
}
.btn-nav {
  cursor: pointer;
  position: relative;
  border: none;
  width: 40px;
  height: 40px;
  background: $btn-nav-background;

  &:active {
    box-shadow: none;
  }

  .nav-dots {
    position: absolute;
    left: 17px;
    top: 17px;
    display: block;
    width: $dot-size;
    height: $dot-size;
    border-radius: $dot-border-radius;
    background-color: $dot-color;
    transition: all 0.1s ease-in-out;
    transform: rotate(90deg);
    &::before,
    &::after {
      position: absolute;
      top: 0;
      left: 0;
      content: "";
      width: $dot-size;
      height: $dot-size;
      border-radius: $dot-border-radius;
      background-color: $dot-color;
      transition: all 0.1s ease-in-out;
    }

    &::before {
      transform: translateX(-8px);
    }

    &::after {
      transform: translateX(8px);
    }
  }

  &.btn-nav--open {
    .nav-dots {
      background-color: transparent;

      &::before,
      &::after {
        left: -12px;
        top: 1px;
        height: 3px;
        width: 30px;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }
}
</style>
