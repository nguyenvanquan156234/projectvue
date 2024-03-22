<template>
  <div class="products" id="products">
    <div class="container" id="pro">
      <h1 class="text-center mb-5 text-white">Sản Phẩm của chúng tôi</h1>
      <div class="row">
        <div
          class="col-md-4 mb-4"
          v-for="product in products"
          :key="product.id"
        >
          <div class="card product-item">
            <img
              :src="product.image"
              style="height: 400px"
              class="card-img-top"
              :alt="product.name"
            />
            <div class="card-body">
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="text-danger">Giá: ${{ product.price }}</p>
              <button
                type="button"
                class="btn btn-danger"
                @click="openDetailModal(product)"
              >
                Xem chi tiết
              </button>
              <AddToCart
                class="mt-2"
                :image="product.image"
                :productId="product.id"
                :price="product.price"
                :name="product.name"
              ></AddToCart>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal for displaying product details -->
  <div
    class="modal fade"
    id="detailModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Chi tiết sản phẩm</h5>
          <button
            type="button"
            class="close"
            @click="closeDetailModal"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <img
            :src="selectedProduct.image"
            style="height: 200px"
            class="card-img-top modal-product-image"
            :alt="selectedProduct.name"
          />
          <h5 class="card-title">{{ selectedProduct.name }}</h5>
          <p class="text-danger">Giá: ${{ selectedProduct.price }}</p>
          <p>{{ selectedProduct.description }}</p>
          <div >
           
          </div>

         
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeDetailModal"
            data-dismiss="modal"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import AddToCart from "../views/AddToCart.vue";

export default {
  name: "ProductsView",
  data() {
    return {
      products: [],
      selectedProduct: {}, // Thay đổi thành kiểu dữ liệu đối tượng
    };
  },
  components: {
    AddToCart,
  },
  mounted() {
    this.readData();
  },
  methods: {
    async readData() {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        querySnapshot.forEach((doc) => {
          const productData = doc.data();
          productData.id = doc.id;
          this.products.push(productData);
        });
      } catch (error) {
        console.error("Error reading documents: ", error);
      }
    },
    openDetailModal(product) {
      // Gán sản phẩm được chọn vào selectedProduct và hiển thị modal

      this.selectedProduct = product;
      console.log(this.selectedProduct);
      this.$nextTick(() => {
        $("#detailModal").modal("show");
      });
    },
    closeDetailModal() {
      this.$nextTick(() => {
        $("#detailModal").modal("hide");
      });
    },
  },
};
</script>

<style scoped>
.products {
  padding: 50px 0;
  background: linear-gradient(to right, #df56e6, #4e490e);
}

.product-item {
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: transform 0.3s ease;
}

.product-item:hover {
  transform: translateY(-5px);
}
.modal-product-image {
  height: 200px;
  width: 100%;
  object-fit: cover;
}
</style>
