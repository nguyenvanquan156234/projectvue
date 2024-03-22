<template>
    <div class="modal" id="minicart" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Giỏ hàng của tôi</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="closemodal"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul class="list-group">
              <li
                v-for="item in this.$store.state.cart"
                :key="item.productId"
                class="list-group-item"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex align-items-center">
                    <img
                      :src="item.productImage"
                      alt="Product Image"
                      style="width: 50px; height: auto"
                    />
                    <span class="ms-3">{{ item.productName }}</span>
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="me-3 text-danger">Giá: ${{ item.productPrice }}</span>
                    <span class="me-3 text-danger">Số lượng: {{ item.productQuantity }}</span>
                    <button
                      type="button"
                      class="btn btn-sm btn-danger"
                      @click="$store.commit('removeFromCart', item)"
                    >
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success"
              @click="closemodal"
            >
              Tiếp tục mua hàng
            </button>
            <router-link
              to="/checkout"
              @click="closemodal"
              class="btn btn-primary"
            >
              Thanh toán
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MiniCart',
    props: {
      msg: String
    },
    methods: {
      closemodal() {
        $("#minicart").modal("hide");
      }
    }
  };
  </script>
  
  <style scoped>
  /* Cải thiện giao diện và màu sắc của nút xóa sản phẩm */
  .btn-danger {
    background-color: #dc3545; /* Màu đỏ của Bootstrap */
    border-color: #dc3545; /* Màu đỏ của Bootstrap */
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    color: #fff; /* Màu chữ trắng */
  }
  .btn-danger {
  background-color: #dc3545; /* Màu đỏ của Bootstrap */
  border-color: #dc3545; /* Màu đỏ của Bootstrap */
  color: #fff; /* Màu chữ trắng */
}
  /* Cải thiện màu sắc của nút close trong modal */
  .close {
    color: #000; /* Màu chữ đen */
  }
  </style>
  