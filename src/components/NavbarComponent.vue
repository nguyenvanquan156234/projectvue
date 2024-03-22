<template>
  <nav class="navbar navbar-expand-lg navbar-light" id="custom-navbar">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" style="color: white;">Shop Công Nghệ</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/" class="nav-link active" aria-current="page" style="color: white;">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/order" class="nav-link active" aria-current="page" style="color: white;">Đơn hàng đã mua</router-link>
          </li>
        
        </ul>
        <form class="d-flex" @submit.prevent="search">
          <input class="form-control me-2" v-model="searchTerm" type="search" placeholder="Search" aria-label="Search">
          <button  class="btn btn-outline-light"  type="submit" data-bs-toggle="modal" data-bs-target="#searchModal">Search</button>
          <button class="btn btn-success" type="button" data-bs-target="#minicart" data-bs-toggle="modal">Cart</button>
        </form>
        <a class="btn btn-info ms-2" data-bs-target="#loginModal" data-bs-toggle="modal">Đăng nhập</a>
      </div>
    </div>
    <LoginComponent></LoginComponent>
  </nav>  
  <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="searchModalLabel">Kết quả tìm kiếm</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <ul>
            <li v-for="(result, index) in searchResults" :key="index">
              <!-- Hiển thị hình ảnh sản phẩm -->
              <img :src="result.image" alt="Product Image" style="width: 100px; height: 100px;">
              <!-- Hiển thị tên sản phẩm -->
              <h4>{{ result.name }}</h4>
              <!-- Hiển thị mô tả sản phẩm -->
              <p>{{ result.description }}</p>
              <!-- Hiển thị giá sản phẩm -->
              <p>Giá: {{ result.price }} USD</p>
              <AddToCart class="add-to-cart-button"
                :image = "result.image"
                :productId="result.id"
                :price = "result.price"
                :name = "result.name"
              ></AddToCart>
            </li>
          </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import AddToCart from "../views/AddToCart.vue";
import LoginComponent from './LoginComponent.vue'
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  query, // Import query từ Firebase SDK
  where // Import where từ Firebase SDK
} from "firebase/firestore";
import { db } from "../firebase";
export default {
  

  data() {
    return {
      searchTerm: '',
      searchResults: [] // Khai báo thuộc tính searchTerm
    };
  },
  methods: {
   
    async search() {
  try {
    const querySnapshot = await getDocs(
      query(collection(db, "products"), where('name', '==', this.searchTerm))
    );
    this.searchResults = querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error searching:", error);
  }
}
  },
  components: {
    LoginComponent,
    AddToCart
  },
};
</script>


    <style>
    /* Thêm các tùy chỉnh CSS tại đây để tạo ra một thanh navbar đẹp mắt */
    .navbar-brand {
      font-size: 1.5rem; /* Kích thước chữ cho tên của navbar */
      font-weight: bold; /* Độ đậm của font */
    }
    #custom-navbar {
  background-image: linear-gradient(to right, #bd2cc0, #f75733);
  }
    .navbar-nav .nav-link {
      font-size: 1.1rem; /* Kích thước chữ cho các link trong navbar */
      margin-right: 1rem; /* Khoảng cách giữa các link */
    }
    
    .form-control {
      height: 38px; /* Độ cao của input */
      font-size: 1rem; /* Kích thước chữ cho input */
    }
    /* CSS cho modal hiển thị kết quả tìm kiếm sản phẩm */
#searchModal .modal-content {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

#searchModal .modal-header {
  background-color: #f75733;
  color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

#searchModal .modal-title {
  font-size: 1.5rem;
  font-weight: bold;
}

#searchModal .modal-body {
  padding: 20px;
}

#searchModal .modal-footer {
  justify-content: center;
}

#searchModal .btn-secondary {
  background-color: #bd2cc0;
  border-color: #bd2cc0;
}

#searchModal .btn-secondary:hover {
  background-color: #ad26b3;
  border-color: #ad26b3;
}

#searchModal .btn-outline-light {
  background-color: transparent;
  border-color: #fff;
  color: #fff;
}

#searchModal .btn-outline-light:hover {
  background-color: #fff;
  color: #f75733;
}

#searchModal .btn-close {
  color: #fff;
  opacity: 1;
}

#searchModal .modal-body ul {
  list-style: none;
  padding: 0;
}

#searchModal .modal-body ul li {
  margin-bottom: 20px;
}

#searchModal .modal-body img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}

#searchModal .modal-body h4 {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: bold;
}

#searchModal .modal-body p {
  color: #666;
}

#searchModal .modal-body p.price {
  font-weight: bold;
  color: #f75733;
}
/* CSS cho nút "Add to Cart" */


    </style>