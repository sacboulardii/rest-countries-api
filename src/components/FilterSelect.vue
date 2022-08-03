<template>
  <div class="filter">
    <select name="" id="" class="filter__select">
      <option value="" disabled selected hidden>Filter by Region</option>
      <option value="Country 2">Country 2</option>
      <option value="Country 3">Country 3</option>
      <option value="Country 4">Country 4</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'FilterSelect',
}
</script>

<style lang="sass">
.filter
  margin-bottom: 2rem
.filter__select

  background-color: white
  border: none
  border-radius: 0.25rem
  border-right: 1rem solid transparent

  box-shadow:         0px 2px 8px 4px rgba(0,0,0,0.05)
  -webkit-box-shadow: 0px 2px 8px 4px rgba(0,0,0,0.05)
  -moz-box-shadow:    0px 2px 8px 4px rgba(0,0,0,0.05)

  padding: 1rem
  width: 60%

  ::focus
    outline: none
</style>
