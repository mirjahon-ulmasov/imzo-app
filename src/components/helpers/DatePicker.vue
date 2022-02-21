<template>
  <Datepicker
    v-model="localDate"
    :format="format"
    :enableTimePicker="false"
    inputClassName="dp-custom-input"
    calendarCellClassName="dp-custom-cell"
    menuClassName="dp-custom-menu"
  >
    <template #input-icon>
      <img
        class="inbox-icon"
        src="@/assets/images/icons/datepicker-inbox.svg"
      />
    </template>
    <template #clear-icon="{ clear }">
      <img
        class="clear-icon"
        src="@/assets/images/icons/datepicker-close.svg"
        @click="clear"
      />
    </template>
  </Datepicker>
</template>

<script>
import Datepicker from "vue3-date-time-picker";
import "vue3-date-time-picker/dist/main.css";
import { ref, watchEffect } from "vue";
export default {
  components: { Datepicker },
  props: {
    date: {
      type: Date,
      default: new Date(),
    },
  },
  setup(props, context) {
    const localDate = ref(props.date);

    const format = date => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      return `${day}/${month}/${year}`;
    };

    watchEffect(() => context.emit("getDate", localDate.value));

    return { format, localDate };
  },
};
</script>

<style lang="scss" scoped></style>
