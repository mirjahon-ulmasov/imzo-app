<template>
  <button class="btn btn-nav js-nav-toggler">
    <span class="sr-only"> </span> <span class="nav-dots"></span>
  </button>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
$dot-size: 5px;
$dot-border-radius: $dot-size / 2;
$dot-color: #51aafd;
.btn-nav {
  position: relative;
  float: right;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  cursor: pointer;

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
