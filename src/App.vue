<template>
  <nav
    class="navbar navbar-expand-lg navbar-light"
    style="background-color: #872f6e"
  >
    <div class="container-fluid">
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
<card-item />
</template>

<script>
import CardItem from "./components/CardItem.vue"
export default {
components: {
  CardItem
}
};
</script>


