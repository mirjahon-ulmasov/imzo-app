<template>
  <label
    @click.prevent="onCheckbox = !onCheckbox"
    for="archive"
    class="custom-archive-btn active"
  >
    <input id="archive" type="checkbox" />
    <span :class="onCheckbox == false ? 'left' : 'right'"></span>
  </label>
</template>

<script>
export default {
  data() {
    return {
      onCheckbox: false,
    };
  },
};
</script>

<style lang="scss">
.custom-archive-btn {
  cursor: pointer;
  position: relative;
  height: 41px;
  width: 94px;
  border-radius: 10px;
  display: block;
  background: url("~@/assets/images/icons/Paper-Negative.svg"),
    url("~@/assets/images/icons/Paper-Plus.svg") #e2f1ff;
  background-repeat: no-repeat no-repeat;
  background-position: 10% 50%, 90% 50%;
  span {
    height: 31px;
    width: 31px;
    margin: 5px;
    position: absolute;
    display: block;
    background: #ffffff;
    border-radius: 8px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 0.5s ease;
    &.left {
      left: 0;
    }
    &.right {
      right: 0;
    }
  }
  input[type="checkbox"] {
    display: none;
    position: absolute;
    width: 10px;
    height: 10px;
  }
}
</style>
