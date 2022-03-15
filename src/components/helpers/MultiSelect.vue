<template>
  <div class="dropdown">
    <div
      class="dropdown-input"
      @click="
        isOpen = !isOpen;
        $emit('getUsers', selected);
      "
    >
      Введите
      <div :class="isOpen ? 'triangle-up' : 'triangle-down'" />
    </div>
    <div class="dropdown-content" v-if="isOpen">
      <div class="search">
        <input type="text" v-model="search" @change="$emit('search', search)" />
        <span>Поиск</span>
      </div>
      <div class="result">
        <h3>Пользователи: 189.000</h3>
        <label @click="getAllUsers()">
          <div class="box">
            <div class="mark" v-show="isAll"></div>
          </div>
          <p>Всем</p>
        </label>
      </div>
      <div v-if="users && users.length > 0" class="scroll">
        <div
          v-for="(user, i) in users"
          :key="i"
          :style="{
            'background-image': `url(${
              user.gender === 0
                ? require('@/assets/images/icons/users-bold-blue.svg')
                : require('@/assets/images/icons/users-bold-red.svg')
            })`,
          }"
          class="user-data"
          :class="{ selected: isSelected(user.id) }"
          @click="addSelect(user.id)"
        >
          <span>{{ user.first_name }} {{ user.last_name }}</span>
          <span>{{ user.phone_number || "&#8212;" }}</span>
        </div>
      </div>
      <h3 v-if="!users || users.length === 0" class="no-data">
        Результаты не найдены.
      </h3>
    </div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref, toRefs } from "vue";
export default {
  props: {
    options: {
      type: Array,
      required: false,
    },
    default: {
      type: Array,
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
    const isAll = ref(false);
    const { options } = toRefs(props);
    const users = ref(options.value);
    const selected = ref([]);

    onUpdated(() => {
      users.value = options.value;
    });

    const isSelected = id => {
      return selected.value.some(el => {
        return el === id;
      });
    };

    const addSelect = id => {
      const isContain = selected.value.some(el => {
        return el === id;
      });
      if (isContain) {
        selected.value = selected.value.filter(el => el !== id);
      } else {
        selected.value.push(id);
      }
    };

    const getAllUsers = () => {
      selected.value = !isAll.value ? users.value.map(user => user.id) : [];
      isAll.value = !isAll.value;
    };

    onMounted(() => {
      selected.value =
        props.default && props.default.length > 0 ? props.default : [];
      context.emit("getUsers", selected.value);
    });

    return {
      isOpen,
      selected,
      search,
      users,
      isSelected,
      addSelect,
      getAllUsers,
      isAll,
    };
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

      label {
        display: flex;
        align-items: center;
        .box {
          height: 24px;
          width: 24px;
          padding: 5px;
          margin-right: 10px;
          border-radius: 5px;
          text-align: center;
          background: #ffffff;
          border: 0.5px solid #d0d4d9;

          &:hover {
            border: 0.5px solid #51aafdbb;
          }

          .mark {
            width: 12px;
            height: 12px;
            background: #51aafd;
            border-radius: 3px;
          }
        }
        p {
          font-size: 16px;
          color: #51aafd;
        }
      }
    }

    .scroll {
      max-height: 250px;

      .user-data {
        display: flex;
        justify-content: space-between;
        margin: 1rem 3px 0 3px;
        list-style: none;
        font-size: 16px;
        padding: 12px;
        border-radius: 10px;
        background-position: 2%;
        background-repeat: no-repeat;
        background-color: #ffffff;
        border: 0.5px solid #d0d0d0;

        &:first-child {
          margin-top: 3px;
        }
        span {
          &:first-child {
            font-size: 16px;
            color: #93928e;
            margin-left: 20px;
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
