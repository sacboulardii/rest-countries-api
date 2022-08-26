<template>
  <i class="gg-chevron-up-r" v-scroll-to="'.header'"></i>
</template>

<script setup></script>

<style lang="scss" scoped>
.gg-chevron-up-r {
  background-color: var($--theme-circle-chevron-color);
  color: black;

  border-radius: 6px;
  border: 0;

  box-sizing: border-box;

  cursor: pointer;

  display: block;

  position: fixed;
  right: 4%;
  bottom: 4%;
  z-index: 9999;

  width: 40px;
  height: 40px;

  @media (min-width: 768px) {
    width: 55px;
    height: 55px;
  }

  &::after {
    color: white;

    border-right: 3px solid;
    border-top: 3px solid;

    box-sizing: border-box;
    content: '';

    display: block;

    position: absolute;
    top: 50%;
    left: 61%;
    transform: rotate(-45deg) translateX(-50%) translateY(-90%);

    width: 10px;
    height: 10px;

    @media (min-width: 768px) {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
