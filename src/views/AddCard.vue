<template>
<nav-bar />
<div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label>File
        <input type="file" id="file" ref="file" @change="handleFileUpload()"/>
      </label>
        <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>
<script>
import NavBar from "../components/NavBar.vue"
export default {
components: {
     NavBar
  },
  data(){
  return {
    file: null
  }
},
methods: {
  handleFileUpload(){
    this.file = this.$refs.file.files[0];
    console.log(this.file)
  },
  submitFile(){
    const formData = new FormData();
     formData.append('file', this.file);
    fetch("http://localhost:3000/add",{
      method: 'POST',
      headers: {
      'Content-Type': 'multipart/form-data'
      },
      body: this.file  
    })
    console.log(formData)
  }
}
}
</script>

<style scoped>

</style>