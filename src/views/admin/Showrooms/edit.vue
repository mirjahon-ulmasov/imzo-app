<template>
  <div
    v-if="(regions && path === '/showrooms/add') || place.districtName !== ''"
  >
    <p>
      <span>Шоурумы</span>
      <img src="@/assets/images/icons/arrow-right.svg" alt="arrow" />
      Добавление шоурума
    </p>
    <h3>Регистрация шоурума</h3>
    <h3 style="display: inline-block">Загрузка изображений</h3>
    <div class="actions">
      <button style="background: #edf7ff" @click="addImageHandler()">
        <img src="@/assets/images/icons/plus-icon.svg" alt="plus" />
      </button>
      <button style="background: #ffeded" @click="deleteImageHandler()">
        <img src="@/assets/images/icons/trash.svg" alt="trash" />
      </button>
    </div>
    <div class="images">
      <div
        v-for="(imgPreview, i) in imgPreviewList"
        :key="i"
        class="image-input"
        :style="{
          'box-shadow':
            imgPreview.id === activeImgId
              ? '0px 0px 2px 2px rgb(81, 170, 253)'
              : '',
          'background-image': `linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.5) 25%,
                rgba(255, 255, 255, 0.5) 100%
              ),
              url(${
                imgPreview.image_link !== ''
                  ? imgPreview.image_link
                  : require('@/assets/images/icons/banner-3.png')
              })`,
        }"
        @click="setActiveImg(imgPreview.id)"
      >
        <label>
          <img src="@/assets/images/icons/camera.svg" alt="camera" />
          <FileUpload @fileInput="fileInputHandler" />
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
            <h4>Город</h4>
            <v-select
              @input="getRegion"
              :options="regions"
              :default="{
                title: place.regionName,
                value: place.regionId,
              }"
            ></v-select>
          </div>
          <div class="input-form">
            <h4>Район</h4>
            <v-select
              @input="getDistrict"
              :options="districts"
              :default="{
                title: place.districtName,
                value: place.districtId,
              }"
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
          <button type="submit" class="form-btn" :disabled="disabled">
            Сохранить шоурум
          </button>
        </form>
      </div>
      <div class="right"></div>
    </div>
  </div>
  <notification
    :isShow="notification.isShow"
    :header="notification.header"
    :is_success="notification.isSuccess"
    @cancel="cancelHandler"
  ></notification>
</template>

<script>
import FileUpload from "@/components/helpers/FileUpload.vue";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  props: ["id"],
  components: { FileUpload },
  setup(props) {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const imgPreviewList = ref([{ image_link: "", id: Date.now() }]);
    const activeImgId = ref(1);
    const images = ref([]);

    const disabled = ref(false);

    const showroom = ref({
      name: "",
      district: "",
      address_street: "",
      house_number: "",
      longitude: "",
      latitude: "",
    });

    const place = ref({
      districtId: "",
      districtName: "",
      regionId: "",
      regionName: "",
    });

    // -------------- ADD and DELETE IMAGES --------------
    const fileInputHandler = ({ file, filePreview }) => {
      imgPreviewList.value.forEach(image => {
        if (image.id === activeImgId.value) {
          image.image_link = filePreview;
        }
      });

      images.value.push(file);
    };

    const setActiveImg = id => {
      activeImgId.value = id;
    };

    const deleteImageHandler = () => {};

    const addImageHandler = () => {
      imgPreviewList.value.push({ image_link: "", id: Date.now() });
      // store.dispatch("addShowroomImage", {id: props.id, image: });
    };

    // -------------- EDIT SHOWROOM --------------
    onMounted(() => {
      store.dispatch("fetchRegions");

      if (props.id) {
        store.dispatch("fetchShowroomById", props.id).then(data => {
          data.images.forEach((img, i) => {
            imgPreviewList.value[i] = img;
          });
          showroom.value = {
            name: data.name,
            latitude: data.latitude,
            longitude: data.longitude,
            district: data.district_id,
            address_street: data.address_street,
            house_number: data.address_house_number,
          };
          store.dispatch("fetchRegions").then(regions => {
            regions.forEach(region => {
              if (region.id === data.region_id) {
                place.value = {
                  ...place.value,
                  regionName: region.name,
                  regionId: region.id,
                };
              }
            });
            store.dispatch("fetchDistricts", data.region_id).then(districts => {
              districts.items.forEach(district => {
                if (district.id === data.district_id) {
                  place.value = {
                    ...place.value,
                    districtName: district.name,
                    districtId: district.id,
                  };
                }
              });
            });
          });
        });
      }
    });

    onUnmounted(() => {
      reset();
    });

    // -------------- Region and Districts --------------
    const getDistrict = value => {
      showroom.value.district = value;
    };
    const getRegion = value => {
      store.dispatch("fetchDistricts", value);
    };

    // -------------- Notifications --------------
    const notification = ref({
      isShow: false,
      isSuccess: false,
      header: "",
    });
    const cancelHandler = () => {
      notification.value.isShow = false;
      router.push("/showrooms");
    };

    // -------------- Submit --------------
    const submitShowroom = () => {
      disabled.value = true;
      const formData = new FormData();

      images.value.forEach(image => {
        formData.append("images", image);
      });
      formData.append("name", showroom.value.name);
      formData.append("district", showroom.value.district);
      formData.append("address_street", showroom.value.address_street);
      formData.append("address_house_number", showroom.value.house_number);
      formData.append("longitude", showroom.value.longitude);
      formData.append("latitude", showroom.value.latitude);

      if (props.id) {
        store
          .dispatch("updateShowroomById", { id: props.id, data: formData })
          .then(() => {
            disabled.value = false;
            notification.value = {
              isShow: true,
              isSuccess: true,
              header: "Шоурум успешно изменен!",
            };
          })
          .catch(() => {
            disabled.value = false;
          });
      } else {
        store
          .dispatch("createShowroom", formData)
          .then(() => {
            reset();
            disabled.value = false;
            notification.value = {
              isShow: true,
              isSuccess: true,
              header: "Шоурум успешно зарегистрирован!",
            };
          })
          .catch(() => {
            disabled.value = false;
          });
      }
    };

    // -------------- Reset --------------
    const reset = () => {
      imgPreviewList.value = [{ image_link: "", id: Date.now() }];
      activeImgId.value = 1;
      images.value = [];
      disabled.value = false;

      showroom.value = {
        name: "",
        district: "",
        address_street: "",
        house_number: "",
        longitude: "",
        latitude: "",
      };
      place.value = {
        districtId: "",
        districtName: "",
        regionId: "",
        regionName: "",
      };
    };

    return {
      imgPreviewList,
      fileInputHandler,
      showroom,
      submitShowroom,
      getDistrict,
      getRegion,
      notification,
      cancelHandler,
      disabled,
      place,
      setActiveImg,
      activeImgId,
      addImageHandler,
      deleteImageHandler,
      regions: computed(() => store.getters.getRegions),
      districts: computed(() => store.getters.getDistricts),
      path: route.path,
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
