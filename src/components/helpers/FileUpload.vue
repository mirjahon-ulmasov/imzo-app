<template>
  <!-- <div
      class="previewBlock"
      @click="chooseFile"
      :style="{ 'background-image': `url(${filePreview})` }"
    ></div> -->

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
  data() {
    return {
      filePreview: null,
    };
  },
  methods: {
    chooseFile() {
      this.$refs.fileInput.click();
    },
    selectImgFile() {
      let fileInput = this.$refs.fileInput;
      let imgFile = fileInput.files;

      if (imgFile && imgFile[0]) {
        let reader = new FileReader();
        reader.onload = e => {
          this.filePreview = e.target.result;
          this.$emit("fileInput", {
            file: imgFile[0],
            filePreview: this.filePreview,
          });
        };
        reader.readAsDataURL(imgFile[0]);
      }
    },
  },
};
</script>

<style scoped lang="css"></style>
