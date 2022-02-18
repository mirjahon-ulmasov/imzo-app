<template>
  <div class="search-bar">
    <input type="text" placeholder="Поиск">
    <button class="custom-search-btn"></button>
</div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.search-bar {
  overflow: hidden;
  width: 568px;
  height: 58px;
  background: #ffffff;
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  input {
    width: 100%;
    outline: none;
    border: none;
    padding-left: 25px;
    &::placeholder {
      font-family: "Inter" sans-serif;
      font-style: normal;
      font-weight: normal;
      font-size: 20px;
      line-height: 172.34%;
      color: #93928e;
    }
  }
  .custom-search-btn {
    cursor: pointer;
    border: none;
    height: 100%;
    width: 77px;
    background: #51aafd url("~@/assets/images/icons/search.svg");
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>