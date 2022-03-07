<template>
  <div class="dropdown" @click.self="isOpen = false">
    <div class="dropdown-input" @click="isOpen = !isOpen">
      {{ selected.title }}
      <div :class="isOpen ? 'triangle-up' : 'triangle-down'" />
    </div>
    <div class="dropdown-content scroll" v-if="isOpen">
      <ul v-if="options && options.length > 0">
        <li
          v-for="(option, i) in options"
          :key="i"
          @click="
            selected = option;
            isOpen = false;
            $emit('input', option);
          "
        >
          {{ option.title }}
        </li>
      </ul>
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
    let isOpen = ref(false);
    let selected = ref({ title: "-", value: "" });

    watchEffect(() => {
      selected.value =
        props.default && props.default.title !== ""
          ? props.default
          : { title: "Введите", value: "" };
    });

    onMounted(() => {
      context.emit("input", selected.value);
    });
    return { isOpen, selected };
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
    max-height: 220px;
    width: 400px;
    padding: 20px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    overflow: scroll;
    z-index: 10;

    ul {
      li {
        margin-top: 10px;
        list-style: none;
        font-size: 16px;
        color: #383838;

        &:first-child {
          margin-top: 0px;
        }
      }
    }
    .no-data {
      text-align: center;
      color: #383838;
      font-size: 17px;
    }
  }
}
</style>
