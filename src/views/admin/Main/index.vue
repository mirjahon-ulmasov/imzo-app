<template>
  <div class="main-content">
    <h3>Редактирование</h3>
    <div class="actions">
      <button
        @click.prevent="setActiveTab('welcome')"
        :class="{ active: isActiveTab('welcome') }"
      >
        Текст приветствия
      </button>
      <button
        @click.prevent="setActiveTab('banner')"
        :class="{ active: isActiveTab('banner') }"
      >
        Рекламные баннера
      </button>
      <button
        @click.prevent="setActiveTab('catalog')"
        :class="{ active: isActiveTab('catalog') }"
      >
        Каталог главной страницы
      </button>
    </div>
    <div class="actions">
      <button
        style="padding: 13px 15px"
        @click.prevent="setActiveLang('ru')"
        :class="{ active: isActiveLang('ru') }"
      >
        Ru
      </button>
      <button
        style="padding: 13px 15px"
        @click.prevent="setActiveLang('uz')"
        :class="{ active: isActiveLang('uz') }"
      >
        Uz
      </button>
    </div>

    <WelcomeTab :activeLang="activeLang" v-if="isActiveTab('welcome')" />
    <BannerTab :activeLang="activeLang" v-if="isActiveTab('banner')" />
    <CatalogTab :activeLang="activeLang" v-if="isActiveTab('catalog')" />
  </div>
</template>

<script>
import { ref } from "vue";
import WelcomeTab from "./WelcomeTab.vue";
import BannerTab from "./BannerTab.vue";
import CatalogTab from "./CatalogTab.vue";
export default {
  components: { WelcomeTab, BannerTab, CatalogTab },
  setup() {
    const activeTab = ref("welcome");
    const activeLang = ref("ru");

    const setActiveTab = item => (activeTab.value = item);
    const isActiveTab = item => activeTab.value === item;

    const setActiveLang = item => (activeLang.value = item);
    const isActiveLang = item => activeLang.value === item;

    return {
      setActiveTab,
      isActiveTab,
      setActiveLang,
      isActiveLang,
      activeTab,
      activeLang,
    };
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
    margin-top: 1rem;

    button {
      padding: 13px 24px;
      margin: 0 24px 15px 0;
      border: none;
      font-size: 18px;
      color: #383838;
      font-weight: 400;
      border-radius: 10px;
      background: #ffffff;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.07);
      transition: 0.2s;

      &.active {
        color: #ffffff;
        background: #51aafd;
        box-shadow: 0px 5px 20px transparent;
      }
    }
  }
}
</style>
