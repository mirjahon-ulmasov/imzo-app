<template>
  <div class="background">
    <div class="loading"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.background {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 11;
  background: rgba(255, 255, 255, 0.4);

  .loading {
    z-index: 10;
    position: absolute;
    top: 50vh;
    left: 48vw;
    width: 2.5rem;
    height: 2.5rem;
    border: 4px rgb(108, 164, 255) solid;
    border-top-color: transparent;
    border-radius: 50%;
    animation: loading 1s ease infinite;
  }
}

@keyframes loading {
  to {
    transform: rotate(1turn);
  }
}

@media (max-width: 420px) {
  .loading {
    left: 30vw;
  }
}
</style>
