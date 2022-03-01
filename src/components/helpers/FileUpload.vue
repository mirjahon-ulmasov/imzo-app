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
  props: {},
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
          });
        };
        reader.readAsDataURL(imgFile[0]);
      }
    },
  },
};
</script>
