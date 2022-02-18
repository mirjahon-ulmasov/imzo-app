<template>
  <div class="nav-bar">
    <div class="nav-left">
      <h3>{{ title }}</h3>
      <img
        :src="
          require(`@/assets/images/icons/${
            link === 'inbox'
              ? 'notifications-bold-blue.svg'
              : link.concat('-bold-blue.svg')
          }`)
        "
        alt="icon"
      />
    </div>
    <div class="nav-right">
      <img
        v-if="link !== 'inbox'"
        src="@/assets/images/icons/notifications-new.svg"
        alt="notif"
        @click="router.push('/inbox')"
      />
      <img
        src="@/assets/images/icons/users-light-blue.svg"
        class="user-img"
        alt="profile"
      />
      <div class="user-details">
        <h4>Amal Bashirov</h4>
        <p>Administrator</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  props: ["title"],
  setup() {
    const route = useRoute();
    const router = useRouter();
    const link = computed(() => route.meta.link);

    return { link, router };
  },
};
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px 15px 0px;
  background: #fff;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.03);

  .nav-left {
    padding-left: 40px;
    border-left: 3px solid #51aafd;
    display: flex;
    align-items: center;

    h3 {
      font-weight: 600;
      font-size: 22px;
      color: #383838;
    }

    img {
      width: 1.6rem;
      margin-left: 10px;
    }
  }

  .nav-right {
    display: flex;
    align-items: center;

    img {
      cursor: pointer;
    }

    .user-img {
      padding: 13px;
      margin: 0 1.2rem;
      border-radius: 50%;
      background: #f4f4f4;
    }

    .user-details {
      font-family: Inter;
      h4 {
        font-weight: 600;
        font-size: 18px;
        line-height: 172.34%;
        color: #383838;
      }

      p {
        font-weight: normal;
        font-size: 16px;
        color: #51aafd;
      }
    }
  }
}
</style>
