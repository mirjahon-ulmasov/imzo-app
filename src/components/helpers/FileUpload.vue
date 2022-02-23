<template>
  <input
    style="display: none"
    ref="fileInput"
    type="file"
    id="formFileLg"
    @input="selectImgFile"
  />
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  methods: {
    selectImgFile() {
      let fileInput = this.$refs.fileInput;
      let imgFile = fileInput.files;

      if (imgFile && imgFile[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.$emit("fileInput", {
            file: imgFile[0],
            filePreview: e.target.result,
            id: this.id,
          });
        };
        reader.readAsDataURL(imgFile[0]);
      }
    },
  },
};
</script>
