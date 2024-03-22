<template>
  <div class="container">
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content custom-card">
          <div class="modal-header">
            <h5 class="modal-title" id="addModalLabel">Thêm Sản Phẩm Mới</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <!-- Form for adding new product -->
            <div class="mb-3">
              <label for="newProductName" class="form-label">Tên Sản Phẩm</label>
              <input type="text" class="form-control" id="newProductName" v-model="newProduct.name" placeholder="Nhập tên sản phẩm">
            </div>
            <div class="mb-3">
              <label for="newProductPrice" class="form-label">Giá</label>
              <input type="text" class="form-control" id="newProductPrice" v-model="newProduct.price" placeholder="Nhập giá sản phẩm">
            </div>
            <div class="mb-3">
              <label for="newProductType" class="form-label">Loại Sản Phẩm</label>
              <input type="text" class="form-control" id="newProductType" v-model="newProduct.type" placeholder="Nhập loại sản phẩm">
            </div>
            <div class="mb-3">
              <label for="newProductDescription" class="form-label">Mô Tả</label>
              <textarea class="form-control" id="newProductDescription" v-model="newProduct.description" rows="3" placeholder="Nhập mô tả sản phẩm"></textarea>
            </div>
            <div class="mb-3">
              <label for="newProductImage" class="form-label">Ảnh Sản Phẩm</label>
             
            <input type="file" class="form-control" id="newProductImage" @change="handleFileUpload">
            <img v-if="newProduct.image" :src="newProduct.image" class="img-thumbnail mt-2" style="max-width: 200px;" alt="Product Image">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-primary" @click="saveNewProduct">Lưu</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Bảng hiển thị dữ liệu sản phẩm -->
    <h2>Danh sách sản phẩm</h2>
    <button class="btn btn-primary me-5 float-end"  @click="openAddModal">Thêm</button>
    <div class="row mt-4">
      <div class="col-md-8 offset-md-2">
        <table class="table">
  <thead>
    <tr>
      <th scope="col">Tên Sản Phẩm</th>
      <th scope="col">Giá</th>
      <th scope="col">Thao Tác</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="product in products" :key="product.id">
      <td>{{ product.name }}</td>
      <td>{{ product.price }}</td>
     
      <td>
        <button @click="deleteProduct(product.id)" class="btn btn-danger">Xóa</button>
        <button @click="openEditModal(product)" class="btn btn-warning ms-2">Sửa</button>

      </td>
    </tr>
  </tbody>
</table>

      </div>
    </div>
  </div>
 <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content custom-card">
      <div class="modal-header">
        <h5 class="modal-title" id="editModalLabel">Chỉnh Sửa Sản Phẩm</h5>
        <button type="button" class="close me-2" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" @click="closeModal">&times;</span>
        </button>
      </div>
      <div class="modal-body" v-if="editedProduct">
        <!-- Form for editing product -->
        <div class="mb-3">
          <label for="editProductName" class="form-label">Tên Sản Phẩm</label>
          <input type="text" class="form-control" id="editProductName" v-model="editedProduct.name" placeholder="Nhập tên sản phẩm">
        </div>
        <div class="mb-3">
          <label for="editProductPrice" class="form-label">Giá</label>
          <input type="text" class="form-control" id="editProductPrice" v-model="editedProduct.price" placeholder="Nhập giá sản phẩm">
        </div>
        <div class="mb-3">
          <label for="editProductType" class="form-label">Loại Sản Phẩm</label>
          <input type="text" class="form-control" id="editProductType" v-model="editedProduct.type" placeholder="Nhập loại sản phẩm">
        </div>
        <div class="mb-3">
          <label for="editProductDescription" class="form-label">Mô Tả</label>
          <textarea class="form-control" id="editProductDescription" v-model="editedProduct.description" rows="3" placeholder="Nhập mô tả sản phẩm"></textarea>
        </div>
        <div class="mb-3">
          <label for="editProductImage" class="form-label">Ảnh Sản Phẩm</label>
          <input type="file" class="form-control" id="editProductImage" @change="handleFileUpload">
          
          <img v-if="editedProduct.image" :src="editedProduct.image" class="img-thumbnail mt-2" style="max-width: 200px;" alt="Product Image">
    <span v-if="editedProduct.image" class="delete-img btn btn-danger" @click="deleteImage">Xóa ảnh</span>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal"> 
          Đóng
        </button>
        <button type="button" class="btn btn-primary" @click="updateProduct(editedProduct.id, editedProduct)">
          Lưu
        </button>
      </div>
    </div>
  </div>
</div>
<ProductsView :productsData="products"></ProductsView>
</template>
  
<script>
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default {
  name: "ProductsAdmin",
  data() {
    return {
      products: [],
      newProduct: {
        name: '',
        price: '',
        type: '',
        description: '',
        image: null
      },
      editedProduct: {},
      newProductImageName: ''
    };
  },
  firestore(){
    return {
      products: db.collection('products')
    }
  },
  mounted() {
    this.readData()
  },
  methods: {
    openAddModal() {
      // Reset new product data
      this.newProduct.name = '';
      this.newProduct.price = '';
      this.newProduct.type = '';
      this.newProduct.description = '';
      this.newProduct.image = null;
      // Show add product modal
      $('#addModal').modal('show');
    },
    closeAddModal(){
      $('#addModal').modal('hide');
    },
    closeModal() {
      // Đóng modal bằng cách sử dụng jQuery hoặc JavaScript thuần
      $("#editModal").modal("hide"); // Sử dụng jQuery
      // hoặc
      // document.getElementById('editModal').modal('hide'); // Sử dụng JavaScript thuần

      // Nếu bạn sử dụng Vue 3, bạn có thể thay đổi thuộc tính để đóng modal
      // this.$refs['editModal'].hide();
    },
    openEditModal(product) {

      this.editedProduct = { ...product };
      this.newProductImageName = this.editedProduct.image ? this.getImageNameFromURL(this.editedProduct.image) : '';
      // Populate editedProduct with product data
      // this.editedProduct.id = product.id;
      // this.editedProduct.name = product.name;
      // this.editedProduct.price = product.price;
      // Show the modal
      $("#editModal").modal("show");
    },
    getImageNameFromURL(url) {
  // Tách tên tệp từ URL
  const parts = url.split('/');
  return parts[parts.length - 1];
},
    deleteProduct(productId) {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      deleteDoc(doc(db, "products", productId))
        .then(() => {
          // Xóa sản phẩm khỏi mảng products
          this.products = this.products.filter(product => product.id !== productId);
          alert("Xóa sản phẩm thành công");
        })
        .catch(error => {
          console.error("Lỗi khi xóa sản phẩm:", error);
          alert("Đã xảy ra lỗi khi xóa sản phẩm");
        });
    }
  },

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
    saveNewProduct() {
  // Tạo một object mới để lưu vào Firestore, bao gồm cả file ảnh
  const newProductData = {
    name: this.newProduct.name,
    price: this.newProduct.price,
    type: this.newProduct.type,
    description: this.newProduct.description,
    image: this.newProduct.image
  };

  // Thêm dữ liệu sản phẩm vào Firestore
  addDoc(collection(db, "products"), newProductData)
    .then((docRef) => {
      // Reset dữ liệu của newProduct
      this.newProduct = {
        name: '',
        price: '',
        type: '',
        description: '',
        image: null
      };

      // Đóng modal sau khi thêm sản phẩm thành công
      this.closeAddModal();

      // Hiển thị thông báo thành công
      alert('Thêm sản phẩm thành công');

      // Đọc lại dữ liệu từ Firestore để cập nhật danh sách sản phẩm
      this.products = [];
      this.readData();
    })
    .catch((error) => {
      console.error('Lỗi khi thêm sản phẩm: ', error);
      alert('Đã xảy ra lỗi khi thêm sản phẩm');
    });
},
handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
 
      const storage = getStorage();
      const storageRef = ref(storage, "products/" + file.name);
 
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          this.newProduct.image = downloadURL;
          // Nếu đang cập nhật sản phẩm, cũng cần cập nhật editedProduct.image
          if (this.editedProduct && this.editedProduct.id) {
            this.editedProduct.image = downloadURL;
          }
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    },
    async updateProduct(productId, updatedProductData) {
      try {
        const productRef = doc(db, "products", productId);
 
        // Nếu có ảnh mới được chọn
        if (updatedProductData.image) {
          let imageURL = null;
 
          // Kiểm tra xem ảnh đã được tải lên trước đó hay chưa
          if (updatedProductData.image instanceof File) {
            // Tạo tham chiếu tới nơi lưu trữ trong Firebase Storage
            const storage = getStorage();
            const storageRef = ref(
              storage,
              "products/" + updatedProductData.image.name
            );
 
            // Tải lên ảnh mới lên Firebase Storage
            await uploadBytes(storageRef, updatedProductData.image);
 
            // Lấy URL của ảnh mới đã tải lên
            imageURL = await getDownloadURL(storageRef);
          } else {
            // Nếu ảnh đã được tải lên trước đó, sử dụng URL hiện có
            imageURL = updatedProductData.image;
          }
 
          // Cập nhật URL mới vào dữ liệu sản phẩm
          updatedProductData.image = imageURL;
        }
 
        // Cập nhật thông tin sản phẩm trong Firestore
        await updateDoc(productRef, updatedProductData);
 
        // Cập nhật lại thông tin của sản phẩm trong mảng products
        const index = this.products.findIndex(
          (product) => product.id === productId
        );
        if (index !== -1) {
          this.products[index] = {
            ...this.products[index],
            ...updatedProductData,
          };
        }
 
        // Đóng modal sau khi cập nhật
        this.closeModal();
        this.newProduct = {};
 
        // Hiển thị thông báo thành công
        alert("Cập nhật sản phẩm thành công");
      } catch (error) {
        console.error("Lỗi khi cập nhật sản phẩm:", error);
        alert("Đã xảy ra lỗi khi cập nhật sản phẩm");
      }
    },
deleteImage() {
    // Đặt giá trị của editedProduct.image thành null để xóa ảnh
    this.editedProduct.image = null;
  }
  },
};
</script>

  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style >
.img-wrapp {
  position: relative;
}
.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}
.img-wrapp span.delete-img:hover {
  cursor: pointer;
}
.custom-card {
  background: linear-gradient(135deg, #3498db, #8e44ad);
  color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
}

.custom-card .card-body {
  padding: 20px;
}
</style>