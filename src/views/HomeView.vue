<template>
  <div class="home">
    <NavbarComponent></NavbarComponent>
    <trangChuComponent></trangChuComponent>
    <ProductsView></ProductsView>
    <LoginComponent></LoginComponent>
    <MiniCart></MiniCart>
    
    
  </div>
</template>

<script>
// @ is an alias to /src
import MiniCart from "@/components/MiniCart.vue";
import ProductsView from "@/views/ProductsView.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import trangChuComponent from "@/components/trangChuComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";
export default {
  name: "HomeView",
  data(){
    return{
    
    }
   
  },
  components: {
    NavbarComponent,
    trangChuComponent,
    ProductsView,
    LoginComponent,
    MiniCart,
    
  },
  methods: {
   
  },
};
</script>
