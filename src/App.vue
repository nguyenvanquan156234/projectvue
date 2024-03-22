<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
//import NavbarComponent from './components/NavbarComponent.vue';
//import trangChuComponent from './components/trangChuComponent.vue'
//import ProductsView from "./views/ProductsView.vue";

export default {
  name: 'App',
  components: {
   // NavbarComponent,
   // trangChuComponent,
   // ProductsView
  }
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
