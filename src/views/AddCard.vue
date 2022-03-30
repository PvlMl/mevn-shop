<template>
<nav-bar />
<div class="container col-md-4">
  <form ref="formElem" @submit.prevent="submitFile">
<div class="mb-3">
  <label for="title" class="form-label">title</label>
  <input class="form-control" id="title" placeholder="title" name="title"
  >
</div>
<div class="mb-3">
  <label for="subtitle" class="form-label">subtitle</label>
  <input class="form-control" id="subtitle" placeholder="subtitle" name="subtitle"
  >
</div>
<div class="mb-3">
  <label for="description" class="form-label">description</label>
  <textarea class="form-control" id="description" rows="3" name="description"
  ></textarea>
</div>
<div class="mb-3">
  <label for="price" class="form-label">price</label>
  <input class="form-control" id="price" placeholder="price" name="price"
  >
</div>
<div class="mb-3">
  <label for="formFileSm" class="form-label">select file</label>
  <input class="form-control form-control-sm" id="formFileSm" type="file" name="image"
  ref="file" @change="handleFileUpload()"
  >
</div>
<input type="submit" name="button" class="btn btn-success" id="sendMail" value="Send"
/>
</form>
</div>
<!-- <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
      </label>
        <button v-on:click="submitFile()">Submit</button>
    </div>
  </div> -->
</template>
<script>
import NavBar from "../components/NavBar.vue"
export default {
components: {
     NavBar
  },
  data(){
  return {
    title: '',
    subtitle: '',
    description: '',
    price: '',
    file: null

  }
},
methods: {
  handleFileUpload(){
    this.file = this.$refs.file.files[0];
  },
  submitFile(){
    // const obj = {
    // title: this.title,
    // subtitle: this.subtitle,
    // description: this.description,
    // price: this.price,
    // file: this.file
    // }
   // http://localhost:3000/add
    const formData = new FormData(this.$refs.formElem);
    // formData.append('file', this.file);
    fetch("http://localhost:3000/add",{
      method: 'POST',
      // headers: {
      // 'Content-Type': 'multipart/form-data'
      // },
      body: formData 
    })
    console.log(formData)
  }
}
}
</script>

<style scoped>

</style>