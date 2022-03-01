<template>
  <div class="request-card">
    <div class="card-left">
      <img
        src="@/assets/images/icons/users-light-blue.svg"
        class="user-photo"
        alt="order"
      />
      <ul>
        <li>Сардорбек Максудов</li>
        <li>23 заказа</li>
      </ul>
    </div>
    <div class="card-right">
      <ul>
        <li>16:44</li>
        <li>27.01.2022</li>
      </ul>
      <p>Заявка на замер</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
.request-card {
  padding: 24px 34px;
  margin-bottom: 24px;
  width: 100%;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid red;

  .card-left {
    .user-photo {
      float: left;
      padding: 13px;
      overflow: hidden;
      background: #ffffff;
      border-radius: 50%;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
    }
    ul li {
      text-decoration: none;
      list-style-type: none;
    }
  }
  .card-right {
    p {
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 172.34%;
      color: #93928e;
    }
    ul li {
      text-decoration: none;
      list-style-type: none;
    }
  }
}
</style>
