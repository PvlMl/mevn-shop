<template>
<nav-bar />
<section style="background-color: #eee;">
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-4">
        <div class="card text-black">
          <i class="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
          <img
            :src="getPathImage(item.img)"
            class="card-img-top"
            alt="Apple Computer"
          />
          <div class="card-body">
            <div class="text-center">
              <h5 class="card-title">{{item.title}}</h5>
              <p class="text-muted mb-4">{{item.subtitle}}</p>
            </div>
            <div>
              <div class="d-flex">
                <p>{{item.description}}</p>
              </div>
            </div>
            <div class="d-flex justify-content-between total font-weight-bold mt-4">
              <span>Price</span><span>{{item.price}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>
<script>
import NavBar from "../components/NavBar.vue"
export default {
  URL: "http://localhost:3000",
    components: {
     NavBar
  },
 data(){
   return {
     item: []
   }
 },
 mounted() {
   fetch(this.$options.URL + "/items/" + this.$route.params.id)
   .then(res => res.json())
   .then(res => this.item = res)
 },
 methods: {
    getPathImage(url){
     return this.$options.URL + '/images/' + url;
    }
  }
}
</script>

<style scoped>

</style>