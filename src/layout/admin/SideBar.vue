<template>
  <div class="side-bar">
    <img :src="require('@/assets/images/logo.png')" alt="IMZO" class="logo" />
    <div class="nav-links">
      <div class="link" :class="link === 'dashboard' ? 'active' : ''">
        <router-link to="/dashboard" class="nav-link">
          <img
            :src="
              require(`@/assets/images/icons/dashboard${
                link === 'dashboard' ? '-bold.svg' : '-light.svg'
              }`)
            "
            alt="dashboard icon"
          />
          <p>Приборная панель</p>
        </router-link>
      </div>
      <div class="link" :class="link === 'users' ? 'active' : ''">
        <router-link to="/users" class="nav-link">
          <img
            :src="
              require(`@/assets/images/icons/users${
                link === 'users' ? '-bold.svg' : '-light.svg'
              }`)
            "
            alt="users icon"
          />
          <p>Пользователи</p>
        </router-link>
      </div>
      <div class="link" :class="link === 'requests' ? 'active' : ''">
        <router-link to="/requests" class="nav-link">
          <img
            :src="
              require(`@/assets/images/icons/requests${
                link === 'requests' ? '-bold.svg' : '-light.svg'
              }`)
            "
            alt="requests icon"
          />
          <p>Заявки</p>
        </router-link>
      </div>
      <div class="link" :class="link === 'orders' ? 'active' : ''">
        <router-link to="/orders" class="nav-link">
          <img
            :src="
              require(`@/assets/images/icons/orders${
                link === 'orders' ? '-bold.svg' : '-light.svg'
              }`)
            "
            alt="orders icon"
          />
          <p>Заказы</p>
        </router-link>
      </div>
      <div class="link" :class="link === 'main' ? 'active' : ''">
        <router-link to="/main" class="nav-link">
          <img
            :src="
              require(`@/assets/images/icons/main${
                link === 'main' ? '-bold.svg' : '-light.svg'
              }`)
            "
            alt="main icon"
          />
          <p>Главное меню</p>
        </router-link>
      </div>
      <div class="link" :class="link === 'products' ? 'active' : ''">
        <router-link to="/products" class="nav-link">
          <img
            :src="
              require(`@/assets/images/icons/products${
                link === 'products' ? '-bold.svg' : '-light.svg'
              }`)
            "
            alt="products icon"
          />
          <p>Продукция</p>
        </router-link>
      </div>
      <div class="link" :class="link === 'notifications' ? 'active' : ''">
        <router-link to="/notifications" class="nav-link">
          <img
            :src="
              require(`@/assets/images/icons/notifications${
                link === 'notifications' ? '-bold.svg' : '-light.svg'
              }`)
            "
            alt="notifications icon"
          />
          <p>Уведомления</p>
        </router-link>
      </div>
      <div class="link" :class="link === 'feedback' ? 'active' : ''">
        <router-link to="/feedback" class="nav-link">
          <img
            :src="
              require(`@/assets/images/icons/feedback${
                link === 'feedback' ? '-bold.svg' : '-light.svg'
              }`)
            "
            alt="feedback icon"
          />
          <p>Раздел отзывы</p>
        </router-link>
      </div>
      <div class="link" :class="link === 'showrooms' ? 'active' : ''">
        <router-link to="/showrooms" class="nav-link">
          <img
            :src="
              require(`@/assets/images/icons/showrooms${
                link === 'showrooms' ? '-bold.svg' : '-light.svg'
              }`)
            "
            alt="showrooms icon"
          />
          <p>Шоурумы</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
export default {
  setup() {
    const route = useRoute();
    return { link: computed(() => route.meta.link) };
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
  position: relative;
  width: 280px;
  height: 100vh;
  background: #fff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  z-index: 2;

  .logo {
    margin: 35px 50px;
    width: 10rem;
  }

  .nav-links {
    .link {
      border-left: 3px solid transparent;
      transition: 0.2s;

      .nav-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        font-size: 16px;
        text-align: center;
        color: #93928e;
        margin: 15px 20px;
        border-radius: 10px;
        padding: 10px;
        transition: 0.2s;

        img {
          margin-right: 1rem;
        }
      }
      .active {
        background: #51aafd;
        font-weight: 600;
        color: #ffffff;
      }

      &.active {
        border-left: 3px solid #2695fc;
      }
    }
  }
}
</style>
