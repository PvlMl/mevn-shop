<template>
  <div class="container " style="margin-top: 25px;">
    <div class="row gy-5">
      <div class="col-sm-4"
      v-for="item of items"
      :key="item.id"
      >
        <div class="card" style="width: 18rem; cursor: pointer;"
        @click="this.$router.push('/items/'+item.id)"
        >
          <img :src="getPathImage(item.img)" class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title">{{ item.title }}</h5>
            <p class="card-text">
              {{ item.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  URL: "http://localhost:3000",
  data() {
    return {
      items: []
    }
  },
  mounted(){
   fetch(this.$options.URL)
   .then(res => res.json())
   .then(res => this.items = res)
  },
  methods: {
    getPathImage(url){
     return this.$options.URL + '/images/' + url;
    }
  }
 
}
</script>



