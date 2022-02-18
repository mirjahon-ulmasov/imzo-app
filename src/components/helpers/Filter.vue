<template>
  <div class="dropdown">
    <div class="dropdown-input" @click="isOpen = !isOpen">
      Сначала старые
      <div :class="isOpen?'triangle-down':'triangle-up'" />
    </div>
    <div class="dropdown-content" v-if="isOpen">
      <ul>
        <li>Все</li>
        <li>Сначала старые</li>
        <li>Сначала новые</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let isOpen = ref(false);

    return { isOpen };
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  cursor: pointer;
  position: relative;

  .dropdown-input {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    background: #ebf5ff;
    border-radius: 10px;
    font-size: 16px;
    color: #51aafd;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);

    .triangle-up {
      width: 0;
      height: 0;
      margin-left: 0.7rem;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #51aafd;
    }

    .triangle-down {
      width: 0;
      height: 0;
      margin-left: 0.7rem;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 7px solid #51aafd;
    }
  }

  .dropdown-content {
    position: absolute;
    top: 3rem;
    left: 0px;
    width: 185px;
    background: #fff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 10px 13px;
    z-index: 10;

    ul {
      li {
        margin: 15px;
        list-style: none;
        font-weight: 400;
        font-size: 16px;
        color: #51aafd;
      }
    }
  }
}
</style>
