<template>
    <div class="user-table">
        <div class="table-row">
            <p>Имя</p>
            <p>Фамилия</p>
            <p>Номер телефона</p>
            <p>Город</p>
            <p>Район</p>
            <p>Улица</p>
            <p>Дом</p>
            <p>Пол</p>
            <p>Дата создания</p>
        </div>
        <div class="table-row" v-for="user in users" :key="user.id">
            <p>{{user.name}}</p>
            <p>{{user.surname}}</p>
            <p>{{user.phone_number}}</p>
            <p>{{user.city}}</p>
            <p>{{user.district}}</p>
            <p>{{user.street}}</p>
            <p>{{user.house}}</p>
            <p>{{user.gender}}</p>
            <p>{{user.date}}</p>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      users: [
        {
          id: 1,
          name: "Сардорбек",
          surname: "Максудов",
          phone_number: "+998 90 132-12-32",
          city: "Ташкент",
          district: "Чиланзарский",
          street: "Шокирарык",
          house: "7",
          gender: "Мужской",
          date: "16:44 19.12.2021",
          photo: null,
        },
        {
          id: 2,
          name: "Сардорбек",
          surname: "Максудов",
          phone_number: "+998 90 132-12-32",
          city: "Ташкент",
          district: "Чиланзарский",
          street: "Шокирарык",
          house: "7",
          gender: "Мужской",
          date: "16:44 19.12.2021",
          photo: null,
        },
        {
          id: 3,
          name: "Сардорбек",
          surname: "Максудов",
          phone_number: "+998 90 132-12-32",
          city: "Ташкент",
          district: "Чиланзарский",
          street: "Шокирарык",
          house: "7",
          gender: "Мужской",
          date: "16:44 19.12.2021",
          photo: null,
        },
        {
          id: 4,
          name: "Сардорбек",
          surname: "Максудов",
          phone_number: "+998 90 132-12-32",
          city: "Ташкент",
          district: "Чиланзарский",
          street: "Шокирарык",
          house: "7",
          gender: "Мужской",
          date: "16:44 19.12.2021",
          photo: null,
        },
        {
          id: 1,
          name: "Сардорбек",
          surname: "Максудов",
          phone_number: "+998 90 132-12-32",
          city: "Ташкент",
          district: "Чиланзарский",
          street: "Шокирарык",
          house: "7",
          gender: "Мужской",
          date: "16:44 19.12.2021",
          photo: null,
        },
        {
          id: 2,
          name: "Сардорбек",
          surname: "Максудов",
          phone_number: "+998 90 132-12-32",
          city: "Ташкент",
          district: "Чиланзарский",
          street: "Шокирарык",
          house: "7",
          gender: "Мужской",
          date: "16:44 19.12.2021",
          photo: null,
        },
        {
          id: 3,
          name: "Сардорбек",
          surname: "Максудов",
          phone_number: "+998 90 132-12-32",
          city: "Ташкент",
          district: "Чиланзарский",
          street: "Шокирарык",
          house: "7",
          gender: "Мужской",
          date: "16:44 19.12.2021",
          photo: null,
        },
        {
          id: 4,
          name: "Сардорбек",
          surname: "Максудов",
          phone_number: "+998 90 132-12-32",
          city: "Ташкент",
          district: "Чиланзарский",
          street: "Шокирарык",
          house: "7",
          gender: "Мужской",
          date: "16:44 19.12.2021",
          photo: null,
        },
        {
          id: 4,
          name: "Сардорбек",
          surname: "Максудов",
          phone_number: "+998 90 132-12-32",
          city: "Ташкент",
          district: "Чиланзарский",
          street: "Шокирарык",
          house: "7",
          gender: "Мужской",
          date: "16:44 19.12.2021",
          photo: null,
        },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.user-table {
  min-width: 1701px;
  width: 100%;
  height: auto;
  padding: 30px 32px;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 20px;
  .table-row {
    width: 100%;
    padding: 24px;
    margin: 8px 0px;
    display: flex;
    background: #ffffff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
    border-radius: 15px;
    &:nth-child(1) {
      background: #ebf5ff;
      p {
        color: #383838;
        font-family: "Inter" sans-serif;
        font-style: normal;
        font-weight: normal;
        font-size: 16px;
        line-height: 172.34%;
      }
    }
    p {
      font-family: "Inter" sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 172.34%;
      color: #93928e;
      &:nth-child(1) {
        width: 12%;
      }
      &:nth-child(2) {
        width: 12%;
      }
      &:nth-child(3) {
        width: 14%;
      }
      &:nth-child(4) {
        width: 11%;
      }
      &:nth-child(5) {
        width: 11%;
      }
      &:nth-child(6) {
        width: 11%;
      }
      &:nth-child(7) {
        width: 9%;
      }
      &:nth-child(8) {
        width: 9%;
      }
      &:nth-child(9) {
        width: 11%;
      }
    }
  }
}
</style>