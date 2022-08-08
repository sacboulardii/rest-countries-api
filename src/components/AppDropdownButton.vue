<template>
  <button class="button">
    Filter by Region
    <svg class="arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path
        d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
      ></path>
    </svg>
  </button>
</template>

<script>
export default {
  name: 'AppDropdownButton',
}
</script>

<style lang="scss">
.button {
  background-color: var($--theme-foreground);
  border: none;
  border-radius: 0.25rem;

  box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -webkit-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);
  -moz-box-shadow: 0px 2px 8px 4px rgba(0, 0, 0, 0.05);

  color: var($--theme-font-color);

  width: 60%;
  padding: 1.125rem;
  position: relative;
  text-align: left;
}

.arrow {
  position: absolute;
  top: 50%;
  right: 0.5rem;
  transform: translateY(-50%);
  width: 1.5rem;
}
</style>
