<template>
  <div class="main-layout">
    <SideBar />
    <div class="main">
      <nav-bar :title="title"></nav-bar>
      <div class="scroll">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "./SideBar.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";
export default {
  components: { SideBar },
  setup() {
    const route = useRoute();
    let title = computed(() => route.meta.title["ru"]);
    return { title };
  },
};
</script>

<style lang="scss" scoped>
.main-layout {
  display: flex;

  .main {
    width: calc(100% - 280px);
    height: 100vh;

    .scroll {
      position: relative;
      padding: 34px;
      height: 87vh;
      background-color: #e2f1ff27;
      background-image: url("../../assets/images/icons/background.png");
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      &::-webkit-scrollbar-track {
        border-radius: 30px;
        background: none;
      }
      &::-webkit-scrollbar-thumb {
        background: #f5f8fd;
        border-radius: 30px;
        border: 1px solid transparent;
        background-clip: content-box;
      }
    }
  }
}
</style>
