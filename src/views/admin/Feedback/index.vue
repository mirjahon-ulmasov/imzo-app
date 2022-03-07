<template>
  <div class="main-content">
    <h3>Фильтр отзывов</h3>
    <div class="actions">
      <button
        @click.prevent="setActive('received')"
        :class="{ active: isActive('received') }"
      >
        Полученные
      </button>
      <button
        @click.prevent="setActive('deleted')"
        :class="{ active: isActive('deleted') }"
      >
        Удаленные
      </button>
      <button
        @click.prevent="setActive('published')"
        :class="{ active: isActive('published') }"
      >
        Опубликованные
      </button>
    </div>
    <div class=""></div>
    <div class="flex-col"></div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const activeTab = ref("received");

    const setActive = menuItem => {
      activeTab.value = menuItem;
      console.log(activeTab.value);
    };

    const isActive = menuItem => {
      console.log(activeTab.value === menuItem);
      return activeTab.value === menuItem;
    };

    return { activeTab, setActive, isActive };
  },
};
</script>

<style lang="scss" scoped>
.main-content {
  h3 {
    font-weight: 600;
    font-size: 22px;
    color: #383838;
  }

  .actions {
    margin: 1.5rem 0;

    button {
      padding: 10px 24px;
      margin-right: 24px;
      border: none;
      font-size: 18px;
      color: #383838;
      font-weight: 400;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
    }
    .active {
      color: #ffffff;
      background: #51aafd;
      box-shadow: 0px 5px 20px transparent;
    }
  }
}
</style>
