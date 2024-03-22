<template>
    <div>
      <!-- Nút "Add to cart" -->
      <button class="btn btn-primary" @click="addToCart">Add to cart</button>
  
      <!-- Modal giỏ hàng của tôi -->

    </div>
  </template>
  
  <script>
  export default {
    name: 'AddToCart',
    props: {
      name: String,
      price: String,
      productId: String,
      image:String
    },
    data() {
      return {
        item: {
            productImage : this.image,
          productName: this.name,
          productPrice: this.price,
          productId: this.productId,
          productQuantity: 1
          
        }
      }
    },
    methods: {
      addToCart() {
        // Thay đổi trạng thái hiển thị modal
        this.$store.commit('addToCart', this.item);
      // Mở modal giỏ hàng
      $('#minicart').modal('show');
      $('#searchModal').modal('hide');
    },
    
    }
  }
  </script>
  
  <style scoped>
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  </style>
  