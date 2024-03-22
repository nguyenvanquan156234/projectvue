<template>
    <div>
      <NavbarComponent></NavbarComponent>
  
      <div class="container mt-5 pt-5">
        <h4 class="checkout-heading">Thanh Toán</h4>
        <table class="table checkout-table">
          <thead>
            <tr>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Số lượng</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.$store.state.cart" :key="item.productId" class="checkout-item">
              <td>
                <div class="checkout-product">
                  <img :src="item.productImage" alt="Product Image" class="checkout-product-image" />
                  <div class="checkout-product-details">
                    <span class="checkout-product-name">{{ item.productName }}</span>
                  </div>
                </div>
              </td>
              <td class="checkout-product-price">${{ item.productPrice }}</td>
              <td class="checkout-product-quantity">{{ item.productQuantity }}</td>
              <td><button type="button" class="btn btn-danger" @click="$store.commit('removeFromCart', item)"><i class="fas fa-times"></i></button></td>
            </tr>
            <tr>
              <td colspan="2" class="text-end"></td>
              <td class="checkout-total">Tổng tiền:</td>
              <td class="checkout-total">${{ calculateTotal() }}</td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-primary" @click="showShippingAddressForm">Thêm địa chỉ giao hàng</button>

      </div>
    </div>
    <div v-if="showAddressForm">
        <div class="container mt-5 pt-5">
      <h4 class="checkout-heading">Thanh Toán</h4>
      <table class="table checkout-table">
  <thead>
    <tr>
      <th scope="col">Sản phẩm</th>
      <th scope="col">Giá</th>
      <th scope="col">Số lượng</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <!-- Sử dụng v-for để lặp qua mảng sản phẩm trong state của Vuex -->
    <tr v-for="(item, index) in $store.state.cart" :key="index" class="checkout-item">
      <td>
        <div class="checkout-product">
          <img :src="item.productImage" alt="Product Image" class="checkout-product-image" />
          <div class="checkout-product-details">
            <span class="checkout-product-name">{{ item.productName }}</span>
          </div>
        </div>
      </td>
      <td class="checkout-product-price">${{ item.productPrice }}</td>
      <td class="checkout-product-quantity">{{ item.productQuantity }}</td>
      <td>
        <button type="button" class="btn btn-danger" @click="$store.commit('removeFromCart', item)">
          <i class="fas fa-times"></i>
        </button>
      </td>
    </tr>
    <!-- Sử dụng calculateTotal() để tính tổng tiền -->
    <tr>
      <td colspan="2" class="text-end"></td>
      <td class="checkout-total">Tổng tiền:</td>
      <td class="checkout-total">${{ calculateTotal() }}</td>
    </tr>
  </tbody>
</table>

    
      <div v-if="showAddressForm" class="mt-3">
        <h4>Thông tin địa chỉ giao hàng</h4>
        <div class="mb-3">
          <label for="fullName" class="form-label">Họ và tên</label>
          <input type="text" class="form-control" id="fullName" v-model="shippingInfo.fullName">
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Địa chỉ</label>
          <input type="text" class="form-control" id="address" v-model="shippingInfo.address">
        </div>
        <div class="mb-3">
          <label for="phoneNumber" class="form-label">Số điện thoại</label>
          <input type="text" class="form-control" id="phoneNumber" v-model="shippingInfo.phoneNumber">
        </div>
        <div class="mb-3">
  <label for="shippingMethod" class="form-label">Hình thức nhận hàng</label>
  <select class="form-select" id="shippingMethod" v-model="shippingInfo.shippingMethod">
    <option value="standard">Giao hàng tiêu chuẩn</option>
    <option value="express">Giao hàng nhanh</option>
    <option value="self">Nhận hàng trực tiếp</option>
  </select>
</div>
        <router-link to="/order" class="btn btn-primary" @click="checkout">Thanh toán</router-link>
      </div>

    </div>
    </div>
  </template>
  
  <script>
  import { db } from "../firebase";
  import NavbarComponent from "@/components/NavbarComponent.vue";
  import { addDoc, collection } from "firebase/firestore";
  export default {
    name: 'CheckOut',
    components: {
      NavbarComponent
    },
    props: {
      msg: String
    },
    data() {
  return {
    showAddressForm: false,
    shippingInfo: {
      fullName: '',
      address: '',
      phoneNumber: '',
      shippingMethod: 'standard' // Hình thức nhận hàng mặc định
    }
  };
},
    methods: {
      calculateTotal() {
        let total = 0;
        for (let item of this.$store.state.cart) {
          total += item.productPrice * item.productQuantity;
        }
        return total // Định dạng tổng tiền với 2 chữ số sau dấu thập phân
      },
      showShippingAddressForm() {
    this.showAddressForm = true;
  },
   checkout() {
      // Tạo đối tượng đơn hàng để lưu vào Firestore
      const orderInfo = {
        products: this.$store.state.cart,
        shippingInfo: this.shippingInfo,
        totalPrice: this.calculateTotal(),
      };
      addDoc(collection(db, "donhang"), orderInfo)
    .then((docRef) => {
        alert('Đặt hàng thành công')
      console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
    
  }
    }
  }
  </script>
  
  <style scoped>
  /* Gradient background */
  .container {
    background: linear-gradient(to right, #bd2cc0, #f75733);
    padding: 20px;
    border-radius: 10px;
  }
  
  .checkout-heading {
    color: white;
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .checkout-table {
    color: white;
  }
  
  .checkout-item {
    background-color: #fff;
    margin-bottom: 20px;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .checkout-product {
    display: flex;
    align-items: center;
  }
  
  .checkout-product-image {
    width: 50px;
    height: auto;
    margin-right: 10px;
  }
  
  .checkout-product-details {
    flex-grow: 1;
  }
  
  .checkout-product-name {
    font-weight: bold;
  }
  
  .checkout-product-price,
  .checkout-product-quantity,
  .checkout-total {
    color: #dc3545; /* Bootstrap's danger color */
  }
  
  .btn-danger {
    background-color: #dc3545; /* Bootstrap's danger color */
    border-color: #dc3545; /* Bootstrap's danger color */
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    color: #fff;
  }
  
  .checkout-total {
    font-weight: bold;
  }
  </style>
  