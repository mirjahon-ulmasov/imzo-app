<template>
  <img @click="sideBar = !sideBar" class="sidebar-btn" src="~@/assets/images/icons/sidebar-icon.svg" alt="">
  <div @click="sideBar = !sideBar" v-if="sideBar == true" class="Sidebar">
      
  </div>
</template>

<script>
export default {
  data() {
    return {
      sideBar: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebar-btn {
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  padding: 16px;
  float: right;
}
.Sidebar {
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  top: 0;
  right: 0;
  position: absolute;
  width: 420px;
  height: 100%;
  padding: 0px 32px;
}
</style>