<template>
<nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #872f6e"
  >
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand warning"
      style="color: #FFBB40"
       href="#">My Site</router-link>
       <router-link to="/add" class="navbar-brand warning"
      style="color: #FFBB40"
       href="#">Add item</router-link>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <form class="d-flex mx-auto">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button class="btn btn-outline-warning" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
}
</script>

<style scoped>

</style>