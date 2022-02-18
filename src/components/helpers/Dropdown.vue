<template>
  <div class="dropdown" @blur="isOpen = false">
    <div class="dropdown-input" @click="isOpen = !isOpen">
      {{ selected.title }}
      <div class="triangle-down" v-if="!isOpen" />
      <div class="triangle-up" v-else />
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
    align-items: center;
    padding: 4px 40px;
    background: #ebf5ff;
    border-radius: 10px;
    font-size: 16px;
    color: #51aafd;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);

    .triangle-up {
      width: 0;
      height: 0;
      margin-left: 0.7rem;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #51aafd;
    }

    .triangle-down {
      width: 0;
      height: 0;
      margin-left: 0.7rem;
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-top: 7px solid #51aafd;
    }
  }

  .dropdown-content {
    position: absolute;
    top: 2.5rem;
    left: -4px;
    width: 170px;
    background: #fff;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 10px 15px;
    z-index: 10;

    ul {
      li {
        margin: 15px;
        list-style: none;
        font-weight: 400;
        font-size: 16px;
        color: #51aafd;
      }
    }
  }
}
</style>
