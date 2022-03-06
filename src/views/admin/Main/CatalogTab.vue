<template>
  <div v-if="getCatalog" class="catalog">
    <h3>Количество карточек</h3>
    <div class="actions">
      <button style="background: #edf7ff" @click="addCatalogHandler()">
        <img src="../../../assets/images/icons/plus-icon.svg" alt="plus" />
      </button>
      <button style="background: #ffeded" @click="deleteCatalogHandler()">
        <img src="@/assets/images/icons/trash.svg" alt="trash" />
      </button>
    </div>
    <div class="counts">
      <div
        v-for="(catalog, i) in catalogs"
        :key="i"
        @click="setActiveIndex(catalog.id)"
        class="count"
        :class="{ active: isActiveIndex(catalog.id) }"
      >
        {{ i + 1 }}
      </div>
    </div>
    <div style="display: flex; justify-content: space-between">
      <div class="left" v-if="categories.length > 0">
        <form @submit.prevent="submitCatalog">
          <div class="input-form">
            <h4>Добавить изображение</h4>
            <div
              class="image-input"
              :style="{
                'background-image': `
              url(${
                getCatalog.imagePreview !== ''
                  ? getCatalog.imagePreview
                  : require('../../../assets/images/icons/banner-2.png')
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
            <h4>Текст каталога главной страницы</h4>
            <input
              type="text"
              placeholder="Введите"
              v-model="getCatalog.name_ru"
            />
          </div>
          <div class="input-form" v-show="isActiveLang('uz')">
            <h4>Asosiy sahifa katalogi matni</h4>
            <input
              type="text"
              placeholder="Kiriting"
              v-model="getCatalog.name_uz"
            />
          </div>
          <div class="input-form">
            <h4>Выбор категории</h4>
            <v-select
              @input="getCategory"
              :options="categories"
              :default="defaultCategory"
            ></v-select>
          </div>
          <div class="input-form">
            <h4>Выбор подкатегории</h4>
            <v-select
              @input="getSubcategory"
              :options="subcategories"
              :default="defaultSubCategory"
            ></v-select>
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
              'background-image': `
            url(${
              getCatalog.imagePreview !== ''
                ? getCatalog.imagePreview
                : require('../../../assets/images/icons/banner-2.png')
            })`,
            }"
          >
            <p>
              {{
                activeLang === "ru"
                  ? getCatalog.name_ru !== ""
                    ? getCatalog.name_ru
                    : "Алюминиевые окна"
                  : getCatalog.name_uz !== ""
                  ? getCatalog.name_uz
                  : "Alyuminiy oynalar"
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
import { computed, onMounted, ref, watchEffect } from "vue";
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
    const catalogs = ref([
      {
        id: activeIndex.value,
        editing: false,
        name_ru: "",
        name_uz: "",
        category_id: "",
        image_link: null,
        imagePreview: "",
      },
    ]);

    const categories = computed(() => store.getters.getCategories);
    const subcategories = computed(() => store.getters.getSubCategories);
    const allcategories = computed(() => store.getters.getAllCategories);

    const defaultCategory = ref({});
    const defaultSubCategory = ref({});

    const getCatalog = computed(() => {
      return catalogs.value.find(catalog => {
        return catalog.id === activeIndex.value;
      });
    });

    watchEffect(() => {
      if (allcategories.value) {
        for (let i = 0; i < allcategories.value.length; i++) {
          if (allcategories.value[i].id === getCatalog.value.category_id) {
            defaultCategory.value = {
              value: allcategories.value[i].id,
              title: allcategories.value[i].name,
            };
            defaultSubCategory.value = {
              value: "",
              title: "",
            };
          } else if (
            allcategories.value[i].id !== getCatalog.value.category_id
          ) {
            for (let j = 0; j < allcategories.value[i].children.length; j++) {
              if (
                allcategories.value[i].children[j].id ===
                getCatalog.value.category_id
              ) {
                defaultCategory.value = {
                  value: allcategories.value[i].id,
                  title: allcategories.value[i].name,
                };
                defaultSubCategory.value = {
                  value: allcategories.value[i].children[j].id,
                  title: allcategories.value[i].children[j].name,
                };
              }
            }
          }
        }
      }
    });

    onMounted(() => {
      store.dispatch("fetchCategories");
      store.dispatch("fetchCatalogs").then(data => {
        activeIndex.value = data[0].id;
        catalogs.value = data.map(catalog => {
          return {
            ...catalog,
            editing: true,
            image_link: null,
            imagePreview: catalog.image_link,
          };
        });
      });
    });

    // -------------- Categories --------------
    const getCategory = value => {
      store.commit("SET_SUB_CATEGORIES", value);
      getCatalog.value.category_id = value;
    };

    const getSubcategory = value => {
      getCatalog.value.category_id = value;
    };

    // -------------- Catalog --------------
    const addCatalogHandler = () => {
      catalogs.value.push({
        id: Date.now(),
        editing: false,
        name_ru: "",
        name_uz: "",
        category_id: "",
        image_link: null,
        imagePreview: "",
      });
    };

    const deleteCatalogHandler = () => {
      let index;
      if (getCatalog.value.editing) {
        store.dispatch("deleteCatalogById", getCatalog.value.id);
      }
      catalogs.value = catalogs.value.filter((catalog, i) => {
        if (catalog.id === activeIndex.value) {
          index = i;
          return false;
        }
        return true;
      });
      index = index === catalogs.value.length ? index - 1 : index;
      activeIndex.value = catalogs.value[index].id;
    };

    // -------------- Image Upload --------------
    const fileInputHandler = ({ file, filePreview }) => {
      getCatalog.value.image_link = file;
      getCatalog.value.imagePreview = filePreview;
    };

    // -------------- Submit --------------
    const submitCatalog = () => {
      disabled.value = true;
      const formData = new FormData();
      formData.append("name_ru", getCatalog.value.name_ru);
      formData.append("name_uz", getCatalog.value.name_uz);
      formData.append("category_id", getCatalog.value.category_id);

      if (getCatalog.value.image_link) {
        formData.append("image_link", getCatalog.value.image_link);
      }

      if (getCatalog.value.editing) {
        console.log("I am editing");
      } else {
        store
          .dispatch("createCatalog", formData)
          .then(response => response.data)
          .then(data => {
            catalogs.value = catalogs.value.map(catalog => {
              if (catalog.id === activeIndex.value) {
                return {
                  ...catalog,
                  id: data.data.id,
                  editing: true,
                };
              }
              return { ...catalog };
            });
            activeIndex.value = data.data.id;
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
      catalogs,
      activeIndex,
      isActiveLang,
      fileInputHandler,
      cancelHandler,
      setActiveIndex,
      isActiveIndex,
      submitCatalog,
      getCatalog,
      disabled,
      addCatalogHandler,
      deleteCatalogHandler,
      getCategory,
      getSubcategory,
      defaultCategory,
      defaultSubCategory,
      categories,
      subcategories,
    };
  },
};
</script>

<style lang="scss" scoped>
.catalog {
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
          width: 192px;
          height: 237px;
          border-radius: 30px;
          background-color: #777;

          img {
            top: 90px;
            left: 35%;
          }
        }
      }
    }
  }

  .right {
    width: 35%;
    display: flex;
    justify-content: flex-start;
    .sample {
      margin-top: 1rem;
      width: 240px;
      height: 316px;
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
        width: 192px;
        height: 237px;
        display: flex;
        padding: 20px;
        margin-top: 20px;
        border-radius: 30px;
        background-size: cover;
        background-color: #383838;
        background-position: center;
        background-repeat: no-repeat;
        /* overflow: scroll; */

        p {
          align-self: flex-start;
          font-weight: 500;
          font-size: 20px;
          color: #ffffff;
        }
      }
    }
  }
}
</style>
