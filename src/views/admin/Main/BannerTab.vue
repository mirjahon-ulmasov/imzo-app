<template>
  <div v-if="getBanner" class="banner">
    <h3>Количество баннеров</h3>
    <div class="actions">
      <button style="background: #edf7ff" @click="addBannerHandler()">
        <img src="@/assets/images/icons/plus-icon.svg" alt="plus" />
      </button>
      <button style="background: #ffeded" @click="deleteBannerHandler()">
        <img src="@/assets/images/icons/trash.svg" alt="trash" />
      </button>
    </div>
    <div class="counts">
      <div
        v-for="(banner, i) in banners"
        :key="i"
        class="count"
        @click="setActiveIndex(banner.id)"
        :class="{ active: isActiveIndex(banner.id) }"
      >
        {{ i + 1 }}
      </div>
    </div>
    <div style="display: flex; justify-content: space-between">
      <div class="left">
        <form @submit.prevent="submitBanner">
          <div class="input-form">
            <h4>Добавить изображение</h4>
            <div
              class="image-input"
              :style="{
                'background-image': `linear-gradient(
                7deg,
                rgba(255, 255, 255, 0.5) 25%,
                rgba(255, 255, 255, 0.5) 100%
              ),
              url(${
                getBanner.imagePreview !== ''
                  ? getBanner.imagePreview
                  : require('@/assets/images/icons/banner-1.png')
              })`,
              }"
            >
              <label>
                <img src="@/assets/images/icons/camera.svg" alt="camera" />
                <FileUpload @fileInput="fileInputHandler" />
              </label>
            </div>
          </div>
          <div class="input-form" v-show="isActiveLang('ru')">
            <h4>Текст заголовка</h4>
            <input
              type="text"
              placeholder="Акция Engelberg 7000"
              v-model="getBanner.title_ru"
            />
          </div>
          <div class="input-form" v-show="isActiveLang('uz')">
            <h4>Sarlavha matni</h4>
            <input
              type="text"
              placeholder="Engelberg 7000 aksiyasi"
              v-model="getBanner.title_uz"
            />
          </div>
          <div class="input-form">
            <h4>Ссылка</h4>
            <input
              type="text"
              placeholder="Введите"
              v-model="getBanner.news_url"
            />
          </div>
          <button type="submit" class="form-btn" :disabled="disabled">
            Сохранить
          </button>
        </form>
      </div>
      <div class="right">
        <div class="sample">
          <h4>Пример <span>LIVE</span></h4>
          <div
            class="content"
            :style="{
              'background-image': `linear-gradient(6.93deg, rgba(0, 0, 0, 0.2) 25.44%, rgba(0, 0, 0, 0) 107.17%),
            url(${
              getBanner.imagePreview !== ''
                ? getBanner.imagePreview
                : require('@/assets/images/icons/banner-1.png')
            })`,
            }"
          >
            <p>
              {{
                activeLang === "ru"
                  ? getBanner.title_ru !== ""
                    ? getBanner.title_ru
                    : "Акция Engelberg 7000"
                  : getBanner.title_uz !== ""
                  ? getBanner.title_uz
                  : "Engelberg 7000 aksiyasi"
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
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
import { onMounted, ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: { FileUpload },
  props: {
    activeLang: {
      type: String,
      default: "ru",
    },
  },
  setup(props) {
    const store = useStore();
    const isActiveLang = item => props.activeLang === item;

    const setActiveIndex = item => (activeIndex.value = item);
    const isActiveIndex = item => activeIndex.value === item;
    const activeIndex = ref(Date.now());
    const disabled = ref(false);

    const banners = ref([
      {
        id: activeIndex.value,
        editing: false,
        title_ru: "",
        title_uz: "",
        news_url: "",
        news_image: null,
        imagePreview: "",
      },
    ]);

    onMounted(() => {
      store.dispatch("fetchBanners").then(data => {
        activeIndex.value = data[0].id;
        banners.value = data.map(el => {
          return {
            id: el.id,
            editing: true,
            news_image: null,
            title_ru: el.title_ru,
            title_uz: el.title_uz,
            news_url: el.additional_data.url,
            imagePreview: el.additional_data.image,
          };
        });
      });
    });

    const getBanner = computed(() => {
      return banners.value.find(banner => {
        return banner.id === activeIndex.value;
      });
    });

    const addBannerHandler = () => {
      banners.value.push({
        id: Date.now(),
        editing: false,
        title_ru: "",
        title_uz: "",
        news_url: "",
        news_image: null,
        imagePreview: "",
      });
    };

    const deleteBannerHandler = () => {
      let index = 0;
      if (getBanner.value.editing) {
        store.dispatch("deleteBannerById", getBanner.value.id);
      }
      banners.value = banners.value.filter((banner, i) => {
        if (banner.id !== activeIndex.value) {
          return true;
        }
        index = i;
        return false;
      });

      index = index === banners.value.length ? index - 1 : index;
      activeIndex.value = banners.value[index].id;
    };

    const fileInputHandler = ({ file, filePreview }) => {
      getBanner.value.news_image = file;
      getBanner.value.imagePreview = filePreview;
    };

    const submitBanner = () => {
      disabled.value = true;
      const formData = new FormData();
      formData.append("title_uz", getBanner.value.title_uz);
      formData.append("title_ru", getBanner.value.title_ru);
      formData.append("news_url", getBanner.value.news_url);
      if (getBanner.value.news_image) {
        formData.append("news_image", getBanner.value.news_image);
      }
      if (getBanner.value.editing) {
        store
          .dispatch("updateBannerById", {
            id: getBanner.value.id,
            data: formData,
          })
          .then(() => {
            disabled.value = false;
            notification.value = {
              isShow: true,
              isSuccess: true,
            };
          })
          .catch(() => {
            disabled.value = false;
          });
      } else {
        store
          .dispatch("createBanner", formData)
          .then(response => {
            banners.value = banners.value.map(banner => {
              if (banner.id === activeIndex.value) {
                return {
                  ...banner,
                  editing: true,
                  id: response.data.id,
                };
              }
              return { ...banner };
            });
            activeIndex.value = response.data.id;
            disabled.value = false;
            notification.value = {
              isShow: true,
              isSuccess: true,
            };
          })
          .catch(() => {
            disabled.value = false;
          });
      }
    };

    // -------------- Notifications --------------
    const notification = ref({
      isShow: false,
      isSuccess: false,
    });
    const cancelHandler = () => {
      notification.value.isShow = false;
    };

    return {
      notification,
      banners,
      activeIndex,
      isActiveLang,
      fileInputHandler,
      cancelHandler,
      setActiveIndex,
      isActiveIndex,
      submitBanner,
      disabled,
      getBanner,
      addBannerHandler,
      deleteBannerHandler,
    };
  },
};
</script>

<style lang="scss" scoped>
.banner {
  h3 {
    font-weight: 600;
    font-size: 22px;
    color: #383838;
    margin-right: 1rem;
    display: inline-block;
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
  .counts {
    width: 50%;
    margin-top: 1rem;

    .count {
      display: inline-block;
      padding: 10px;
      text-align: center;
      width: 42px;
      height: 42px;
      margin: 0 15px 15px 0;
      border-radius: 10px;
      font-weight: 500;
      font-size: 18px;
      color: #383838;
      background: #ffffff;
      border: 0.5px solid #d0d4d9;
    }
    .active {
      color: #ffffff;
      background: #51aafd;
      border-color: #51aafd;
    }
  }

  .left {
    form {
      .input-form {
        margin: 1rem 0 2rem 0;
        h4 {
          font-weight: 600;
          font-size: 20px;
          color: #383838;
          margin-bottom: 1rem;
        }
        .image-input {
          width: 300px;
          height: 170px;
          border-radius: 20px;

          img {
            top: 55px;
            left: 40%;
          }
        }
      }
    }
  }

  .right {
    .sample {
      width: 350px;
      height: 250px;
      background: #e5f3ff;
      border-radius: 10px;
      padding: 16px 24px;
      cursor: pointer;

      h4 {
        text-align: center;
        font-weight: bold;
        font-size: 20px;
        color: #383838;

        span {
          color: #51aafd;
          font-size: 22px;
          font-weight: bold;
          text-transform: uppercase;
        }
      }

      .content {
        width: 300px;
        height: 170px;
        display: flex;
        padding: 15px;
        margin-top: 20px;
        border-radius: 10px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        /* overflow: scroll; */

        p {
          align-self: flex-end;
          font-weight: 500;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
