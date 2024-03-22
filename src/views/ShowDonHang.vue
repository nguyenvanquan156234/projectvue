<template>
    <div class="container mt-5">
      <h2 class="text-center mb-4">Lịch sử đơn hàng</h2>
      
      <div v-if="orders.length > 0">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Sản phẩm</th>
              <th scope="col">Thông tin giao hàng</th>
              <th scope="col">Tổng tiền</th>
              <th></th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index">
              <th scope="row">{{ index + 1 }}</th>
              <td>
                <ul>
                  <li v-for="(product, idx) in order.products" :key="idx">
                    <div class="product-item">
                      <img :src="product.productImage" alt="Product Image" class="product-image">
                      <div class="product-details">
                        <p><strong>{{ product.productName }}</strong></p>
                        <p>Giá: {{ product.productPrice }} USD - Số lượng: {{ product.productQuantity }} cái</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </td>
              
              <td>

                <template v-if="order.shippingInfo">
                  <p v-if="order.shippingInfo.fullName"><strong>Họ và tên:</strong> {{ order.shippingInfo.fullName }}</p>
                  <p v-if="order.shippingInfo.address"><strong>Địa chỉ:</strong> {{ order.shippingInfo.address }}</p>
                  <p v-if="order.shippingInfo.phoneNumber"><strong>Số điện thoại:</strong> {{ order.shippingInfo.phoneNumber }}</p>
                  <p v-if="order.shippingInfo.shippingMethod"><strong>Hình thức nhận hàng:</strong> {{ order.shippingInfo.shippingMethod }}</p>
                </template>
                <template v-else>
                  <p>Không có thông tin giao hàng.</p>
                </template>
              </td>
              <td class="text-danger">{{ order.totalPrice }} USD</td>
              <td>
    <button @click="cancelOrder(order.id)" class="btn btn-danger">Hủy Đơn Hàng</button>
  </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else>
        <p>Không có lịch sử đơn hàng.</p>
      </div>
    </div>
  </template>
  
  <script>
  import { db } from "@/firebase";
  import { collection, getDocs, deleteDoc, doc  } from "firebase/firestore";
  
  export default {
    name: 'ShowDonHang',
    data() {
      return {
        orders: []
      };
    },
    mounted(){
      this.readData()
    },
    methods: {
      async readData() {
        try {
          const querySnapshot = await getDocs(collection(db, "donhang"));
          querySnapshot.forEach((doc) => {
            const productData = doc.data();
            productData.id = doc.id;
            this.orders.push(productData);
          });
        } catch (error) {
          console.error("Error reading documents: ", error);
        }
      },
      async cancelOrder(orderId) {
      const confirmed = confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
      if (confirmed) {
        try {
          // Xóa dữ liệu đơn hàng khỏi Firestore
          await deleteDoc(doc(db, "donhang", orderId));

          // Xóa dữ liệu đơn hàng khỏi localStorage
          this.orders = this.orders.filter(order => order.id !== orderId);
          window.localStorage.setItem('orders', JSON.stringify(this.orders));
        } catch (error) {
          console.error("Error cancelling order: ", error);
        }
      }
    }
    }
  };
  </script>
  
  <style scoped>
  .container {
    background: linear-gradient(to right, #bd2cc0, #f75733);
    padding: 20px;
    border-radius: 10px;
  }
  
  .product-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .product-image {
    width: 50px;
    height: auto;
    margin-right: 10px;
  }
  
  .table-striped tbody tr:nth-of-type(odd) {
    background-color: #f8f9fa;
  }
  
  .table-striped tbody tr:nth-of-type(even) {
    background-color: #ffffff;
  }
  
  .table-striped th, .table-striped td {
    color: #212529;
    font-family: Arial, sans-serif;
  }
  </style>
  