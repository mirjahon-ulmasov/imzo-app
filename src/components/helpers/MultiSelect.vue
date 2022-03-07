<template>
  <div class="dropdown" @click.self="isOpen = false">
    <div class="dropdown-input" @click="isOpen = !isOpen">
      Введите
      <div :class="isOpen ? 'triangle-up' : 'triangle-down'" />
    </div>
    <div class="dropdown-content" v-if="isOpen">
      <div class="search">
        <input type="text" v-model="search" />
        <span>Поиск</span>
      </div>
      <div class="result">
        <h3>Пользователи: 189.000</h3>
        <label class="container">
          <p>Всем</p>
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
      </div>
      <div v-if="options && options.length > 0" class="scroll">
        <div
          v-for="(option, i) in options"
          class="user-data"
          :class="{ selected: isSelected(option) }"
          :key="i"
          @click="
            selected.push(option);
            isOpen = false;
            $emit('input', option);
          "
        >
          <span>{{ option.name }}</span>
          <span>{{ option.phone }}</span>
        </div>
      </div>
      <h3 v-if="!options || options.length === 0" class="no-data">
        Результаты не найдены.
      </h3>
    </div>
  </div>
</template>

<script>
import { onMounted, ref, watchEffect } from "vue";
export default {
  props: {
    options: {
      type: Array,
      required: false,
    },
    default: {
      type: Object,
      required: false,
      default: null,
    },
    tabIndex: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  setup(props, context) {
    const search = ref("");
    const isOpen = ref(false);
    const selected = ref([{ id: "", name: "", phone: "" }]);

    const isSelected = value => {
      let is_true = false;
      selected.value.forEach(user => {
        if (user.id === value.id) {
          is_true = true;
        }
      });
      return is_true;
    };

    watchEffect(() => {
      selected.value =
        props.default && props.default.length > 0
          ? props.default
          : [{ id: "", name: "", phone: "" }];
    });

    onMounted(() => {
      context.emit("input", selected.value);
    });
    return { isOpen, selected, search, isSelected };
  },
};
</script>

<style lang="scss" scoped>
.dropdown {
  cursor: pointer;
  position: relative;

  .dropdown-input {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    background: #ffffff;
    padding: 10px 24px;
    border: 0.5px solid #d0d4d9;
    box-sizing: border-box;
    border-radius: 10px;
    font-weight: normal;
    font-size: 18px;
    color: #93928e;

    &:hover {
      border: 0.5px solid #51aafd;
      box-shadow: 0px 0px 3px 1px rgba(70, 120, 236, 0.4);
    }
  }
  .active {
    border: 1px solid #51aafd;
  }
  .dropdown-content {
    position: absolute;
    top: 55px;
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    z-index: 10;

    .search {
      input {
        width: 360px;
        padding-left: 5rem;
        background-position: 95%;
        background-repeat: no-repeat;
        background-image: url("../../assets/images/icons/search.svg");
      }
      span {
        position: absolute;
        top: 31px;
        left: 2.5rem;
        font-size: 18px;
        color: #93928e;
      }
    }

    .result {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 1rem 0;
      h3 {
        font-weight: 600;
        font-size: 18px;
        color: #383838;
      }
      .container {
        p {
          font-size: 16px;
          color: #51aafd;
        }
      }
    }

    .scroll {
      max-height: 250px;

      .user-data {
        margin: 1rem 3px 0 3px;
        list-style: none;
        font-size: 16px;
        padding: 12px;
        border-radius: 10px;
        background-position: 2%;
        background-repeat: no-repeat;
        background-color: #ffffff;
        border: 0.5px solid #d0d0d0;
        background-image: url("../../assets/images/icons/users-bold-blue.svg");

        &:first-child {
          margin-top: 3px;
        }
        span {
          margin-left: 20px;
          &:first-child {
            font-size: 16px;
            color: #93928e;
          }
          &:nth-child(2) {
            font-size: 16px;
            color: #51aafd;
          }
        }
      }
      .selected {
        border: 0.5px solid #51aafd;
        box-shadow: 0px 0px 3px 1px rgba(70, 120, 236, 0.4);
      }
    }

    .no-data {
      margin-top: 1rem;
      text-align: center;
      color: #383838;
      font-size: 17px;
    }
  }
}
</style>
