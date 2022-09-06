<template>
  <footer class="footer">
    Challenge by
    <a target="blank" href="https://www.frontendmentor.io">Frontend Mentor</a>.
    Coded by
    <a target="blank" href="https://github.com/sacboulardii">
      Vitor Alessandro.</a
    >
  </footer>
</template>

<script setup></script>

<style lang="scss" scoped>
.footer {
  width: 100%;
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  padding: 0.375rem 0;

  & a {
    color: var($--theme-footer-link-color);
    transition: color 0.2s ease;

    &:hover {
      color: var($--theme-footer-hover-color);
    }
  }
}
</style>
