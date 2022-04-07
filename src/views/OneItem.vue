<template>
<nav-bar />
<section style="background-color: #eee;">
  <div class="container py-5"
  v-if="item"
  >
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6 col-xl-4">
        <div class="card text-black">
          <!-- <img
            :src="getPathImage(item.img)"
            class="card-img-top"
            alt=""
          /> -->
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
            <div class="spinner-border m-5" role="status"
            v-if="removal"
            >
              <span class="sr-only"></span>
            </div>
            <button type="button" class="btn btn-danger mt-4"
            v-else
            @click="deleteItem(item.id)"
            >Delete item</button>
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
     item: null,
     removal: false
   }
 },
 mounted() {
   this.getItem();
 },
 methods: {
   getItem(){
    fetch(this.$options.URL + "/items/" + this.$route.params.id)
   .then(res => res.json())
   .then(res => this.item = res)
   },
   getPathImage(url){
     return this.$options.URL + '/images/' + url;
    },
   deleteItem(id){
     this.removal = true;
     fetch(this.$options.URL + `/delete/${id}`, {
       method: 'DELETE',
     });
     setTimeout(() => {
      this.removal = false;
       this.$router.push('/')
       }, 1000)
    }
  },
}
</script>

<style scoped>

</style>