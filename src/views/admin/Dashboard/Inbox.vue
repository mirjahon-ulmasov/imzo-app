<template>
  <div class="container">
    <div class="card">
      <div class="left">
        <img src="@/assets/images/icons/inbox.svg" alt="inbox" />
        <p>
          Запланированное уведомление <span>#21231231</span> успешно отправлено
        </p>
      </div>
      <p><span>19:22</span> 19.11.2022</p>
    </div>
    <div class="card">
      <div class="left">
        <img src="@/assets/images/icons/inbox.svg" alt="inbox" />
        <p>
          Запланированное уведомление <span>#21231231</span> успешно отправлено
        </p>
      </div>
      <p><span>19:22</span> 19.11.2022</p>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.container {
  .card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    margin-bottom: 2rem;
    background: #ffffff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
    border-radius: 10px;

    .left {
      display: flex;
      align-items: center;

      img {
        margin-right: 2rem;
      }
    }

    p {
      font-size: 18px;
      color: #93928e;

      span {
        font-weight: 600;
        font-size: 18px;
        color: #51aafd;
      }
    }
  }
}
</style>
