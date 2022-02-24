<template>
  <div class="main-content" v-if="$route.path === '/showrooms'">
    <h3>Шоурумы</h3>
    <div class="actions">
      <router-link :to="{ name: 'addShowroom' }" class="btn">
        <img src="@/assets/images/icons/showrooms-light.svg" alt="showroom" />
        Добавить шоурум
      </router-link>
      <dropdown
        @input="filterPage"
        :options="[
          { title: 'Все', value: 'all' },
          { title: 'Сначала старые', value: 'old' },
          { title: 'Сначала новые', value: 'new' },
        ]"
        :default="{ title: 'Сначала старые', value: 'old' }"
      ></dropdown>
    </div>
    <div v-dragscroll.x class="scroll">
      <div class="table">
        <div class="row table-header">
          <p>Название шоурума</p>
          <p>Долгота и широта</p>
          <p>Дата создания</p>
          <p>Номер телефона</p>
          <p>Город</p>
          <p>Район</p>
          <p>Улица</p>
          <p>Редактировать</p>
        </div>
        <div class="row table-body">
          <p>Шоурум №5</p>
          <p>0.0000 ; 00000</p>
          <p><span>16:44</span> 26.01.2022</p>
          <p>+998 90 123-12-12</p>
          <p>Ташкент</p>
          <p>Чиланзар</p>
          <p>Шокирарык</p>
          <p>
            <router-link :to="{ name: 'editShowroom', params: { id: 1 } }">
              <img
                src="@/assets/images/icons/edit-small.svg"
                alt="edit"
                style="background: #edf7ff"
              />
              Изменить
            </router-link>
          </p>
          <p>
            <img
              src="@/assets/images/icons/trash.svg"
              alt="trash"
              style="background: #ffeded"
            />
            Удалить
          </p>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  setup() {
    const filterPage = value => {
      console.log(value);
    };
    return { filterPage };
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
    display: flex;
    align-items: center;
    margin: 1rem 0;
    justify-content: space-between;

    .btn {
      display: flex;
      width: 210px;
      justify-content: space-between;
      align-items: center;
      border: none;
      color: #51aafd;
      font-size: 16px;
      padding: 8px 16px;
      background: #ffffff;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
      text-decoration: none;
      border-radius: 10px;
      cursor: pointer;
    }
  }
  .scroll {
    overflow-x: scroll;

    .table {
      min-width: 1701px;
      width: 100%;
      height: auto;
      padding: 30px 32px;
      background: #ffffff;
      box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
      border-radius: 20px;
      .row {
        text-decoration: none;
        width: 100%;
        margin: 8px 0px;
        display: flex;
        box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
        border-radius: 15px;
        p {
          font-weight: 400;
          font-size: 16px;
          color: #93928e;
          &:nth-child(1),
          &:nth-child(3),
          &:nth-child(4) {
            width: 12%;
          }
          &:nth-child(5),
          &:nth-child(6),
          &:nth-child(7),
          &:nth-child(8) {
            width: 10%;
          }
          &:nth-child(2) {
            width: 14%;
          }
        }
      }
      .table-header {
        padding: 30px 25px;
        background: #ebf5ff;
        p {
          font-weight: 600;
          color: #383838;
        }
      }
      .table-body {
        padding: 20px 25px;
        background: #ffffff;

        p {
          display: flex;
          align-items: center;

          &:first-child {
            font-weight: 600;
            color: #51aafd;
          }
          &:nth-child(2),
          &:nth-child(8) {
            color: #51aafd;
            a {
              display: flex;
              color: #51aafd;
              cursor: pointer;
              align-items: center;
              text-decoration: none;
            }
          }
          &:last-child {
            color: #ec6464cc;
            cursor: pointer;
          }
          span {
            font-weight: bold;
            color: #383838;
            margin-right: 5px;
          }
          img {
            border-radius: 10px;
            margin-right: 0.7rem;
            padding: 8px;
          }
        }
      }
    }
  }
}
</style>
