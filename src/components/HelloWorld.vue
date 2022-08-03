<template>
  <main class="container">
    <section class="search-wrapper">
      <div class="search-bar">
        <input
          type="text"
          class="search-bar__input"
          placeholder="Search for a country..."
        />
      </div>
      <div class="filter">
        <select name="" id="" class="filter__select">
          <option value="Country 1">Country 1</option>
          <option value="Country 2">Country 2</option>
          <option value="Country 3">Country 3</option>
          <option value="Country 4">Country 4</option>
        </select>
      </div>
    </section>
    <section class="countries">
      <ul class="countries__list">
        <li>
          <div class="card">
            <figure>
              <img src="" alt="" class="card__image" />
            </figure>
            <div class="card__description"></div>
          </div>
        </li>
        <li>
          <div class="card">
            <figure>
              <img src="" alt="" class="card__image" />
            </figure>
            <div class="card__description"></div>
          </div>
        </li>
        <li>
          <div class="card">
            <figure>
              <img src="" alt="" class="card__image" />
            </figure>
            <div class="card__description"></div>
          </div>
        </li>
        <li>
          <div class="card">
            <figure>
              <img src="" alt="" class="card__image" />
            </figure>
            <div class="card__description"></div>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
h3
  margin: 40px 0 0

ul
  list-style-type: none
  padding: 0

li
  display: inline-block
  margin: 0 10px

a
  color: #42b983
</style>
