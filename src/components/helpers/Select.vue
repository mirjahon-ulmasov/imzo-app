<template>
  <div class="dropdown" @click.self="isOpen = false">
    <div class="dropdown-input" @click="isOpen = !isOpen">
      {{ selected.title }}
      <div :class="isOpen ? 'triangle-up' : 'triangle-down'" />
    </div>
    <div class="dropdown-content" v-if="isOpen">
      <ul>
        <li
          v-for="(option, i) in options"
          :key="i"
          @click="
            selected = option;
            isOpen = false;
            $emit('input', option.value);
          "
        >
          {{ option.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
export default {
  props: {
    options: {
      type: Array,
      required: true,
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
    let selected = ref(
      props.default
        ? props.default
        : props.options.length > 0
        ? props.options[0]
        : null
    );

    onMounted(() => {
      context.emit("input", selected.value.value);
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
    max-height: 250px;
    width: 400px;
    padding: 10px;
    border-radius: 10px;
    background: #ffffff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    overflow: scroll;
    z-index: 10;

    ul {
      li {
        margin: 10px;
        list-style: none;
        font-size: 16px;
        color: #383838;
      }
    }
  }
}
</style>
