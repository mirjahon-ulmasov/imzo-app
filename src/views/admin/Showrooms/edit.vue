<template>
  <p>
    <span>Шоурумы</span>
    <img src="@/assets/images/icons/arrow-right.svg" alt="arrow" />
    Добавление шоурума
  </p>
  <h3>Регистрация шоурума</h3>
  <h3 style="display: inline-block">Загрузка изображений</h3>
  <div class="actions">
    <button style="background: #edf7ff" @click="imgPreviewList.push('')">
      <img src="@/assets/images/icons/plus-icon.svg" alt="plus" />
    </button>
    <button style="background: #ffeded" @click="imgPreviewList.pop()">
      <img src="@/assets/images/icons/trash.svg" alt="trash" />
    </button>
  </div>
  <div class="images">
    <div
      v-for="(imgPreview, i) in imgPreviewList"
      :key="i"
      class="image-input"
      :style="{
        background: `linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.5) 25%,
                rgba(255, 255, 255, 0.5) 100%
              ),
              url(${
                imgPreview
                  ? imgPreview
                  : require('@/assets/images/icons/banner-3.png')
              })`,
      }"
    >
      <label>
        <img src="@/assets/images/icons/camera.svg" alt="camera" />
        <FileUpload :id="i" @fileInput="fileInputHandler" />
      </label>
    </div>
  </div>
  <div class="main">
    <div class="left">
      <form @submit.prevent="submitShowroom">
        <div class="input-form">
          <h4>Название шоурума</h4>
          <input type="text" placeholder="Введите" v-model="showroom.name" />
        </div>
        <div class="coordinates">
          <div>
            <h4>Долгота</h4>
            <input
              type="text"
              placeholder="0.00000"
              v-model="showroom.longitude"
            />
          </div>
          <div>
            <h4>Широта</h4>
            <input
              type="text"
              placeholder="0.00000"
              v-model="showroom.latitude"
            />
          </div>
        </div>
        <div class="input-form">
          <h4>Телефон</h4>
          <input type="text" placeholder="Введите" v-model="showroom.phone" />
        </div>
        <div class="input-form">
          <h4>Город</h4>
          <v-select
            @input="getCity"
            :options="[
              { title: 'Товар', value: 'product' },
              { title: 'Отзывы', value: 'reviews' },
              { title: 'Замер', value: 'measurement' },
            ]"
          ></v-select>
        </div>
        <div class="input-form">
          <h4>Район</h4>
          <v-select
            @input="getDistrict"
            :options="[
              { title: 'Товар', value: 'product' },
              { title: 'Отзывы', value: 'reviews' },
              { title: 'Замер', value: 'measurement' },
            ]"
          ></v-select>
        </div>
        <div class="input-form">
          <h4>Улица</h4>
          <input
            type="text"
            placeholder="Введите"
            v-model="showroom.address_street"
          />
        </div>
        <div class="input-form">
          <h4>Дом</h4>
          <input
            type="text"
            placeholder="Введите"
            v-model="showroom.house_number"
          />
        </div>
        <button type="submit" class="form-btn">Сохранить шоурум</button>
      </form>
    </div>
    <div class="right"></div>
  </div>
  <notification
    header="Изменения сохранены"
    :isShow="notification.isShow"
    :is_success="notification.isSuccess"
    @cancel="cancelHandler"
  ></notification>
</template>

<script>
import FileUpload from "@/components/helpers/FileUpload.vue";
import { reactive, ref } from "vue";

export default {
  props: ["id"],
  components: { FileUpload },
  setup() {
    const imgPreviewList = ref([""]);
    const showroom = reactive({
      images: [],
      name: "",
      district: "",
      address_street: "",
      house_number: "",
      longitude: "",
      latitude: "",
      city: "",
      phone: "",
    });

    const fileInputHandler = ({ file, filePreview, id }) => {
      imgPreviewList.value[id] = filePreview;
      showroom.images.push(file);
    };

    const getDistrict = value => {
      showroom.district = value;
    };

    const getCity = value => {
      showroom.city = value;
    };

    const submitShowroom = () => {
      console.log(showroom);
      notification.isShow = true;
      notification.isSuccess = true;
    };

    // -------------- Notifications --------------
    const notification = reactive({
      isShow: false,
      isSuccess: false,
    });
    const cancelHandler = () => {
      notification.isShow = false;
    };
    return {
      imgPreviewList,
      fileInputHandler,
      showroom,
      submitShowroom,
      getDistrict,
      getCity,
      notification,
      cancelHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
p {
  display: flex;
  font-size: 18px;
  color: #93928e;
  align-items: center;

  span {
    color: #51aafd;
  }
}

h3 {
  font-weight: 600;
  font-size: 22px;
  color: #383838;
  margin: 3rem 1rem 0 0;
}
.actions {
  display: inline-block;
  button {
    margin-right: 1rem;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    padding: 8px 10px;

    img {
      width: 20px;
      height: 20px;
    }
  }
}
.images {
  margin-top: 2rem;
  width: 100%;

  .image-input {
    display: inline-block;
    position: relative;
    width: 128px;
    height: 128px;
    margin: 0 20px 20px 0;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;

    img {
      position: absolute;
      top: 40px;
      left: 30%;
      padding: 0.6rem;
      border-radius: 50%;
      opacity: 0.7;
      background: #ffffff;
      cursor: pointer;
    }
  }
}

.main {
  margin-top: 2rem;
  .left {
    width: 50%;
    form {
      .input-form,
      .coordinates {
        margin: 1rem 0 2rem 0;

        h4 {
          font-weight: 600;
          font-size: 20px;
          color: #383838;
          margin-bottom: 1rem;
        }
      }
      .coordinates {
        width: 400px;
        display: flex;
        justify-content: space-between;

        input {
          width: 190px;
        }
      }
    }
  }
  .right {
  }
}
</style>
