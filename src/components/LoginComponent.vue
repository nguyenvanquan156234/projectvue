<template>
  <div>
    <!-- Modal đăng nhập -->
    <div
      class="modal fade"
      id="loginModal"
      tabindex="-1"
      aria-labelledby="loginModalLabel"
      aria-hidden="true"
    >
      <!-- Nội dung modal đăng nhập -->
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="loginModalLabel">
              <i class="fas fa-user-circle"></i> Đăng nhập
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Form đăng nhập -->
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="email" class="form-label"
                  ><i class="fas fa-envelope"></i> Email</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="email"
                  v-model="login_form.email"
                  placeholder="Nhập Email"
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label"
                  ><i class="fas fa-lock"></i> Mật khẩu</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="login_form.password"
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <button type="submit" @click="login()" class="btn btn-primary">
                <i class="fas fa-sign-in-alt"></i> Đăng nhập
              </button>
              <router-link to="/quen" type="submit" id="an" @click="an" class="btn btn-danger">
                <i class="fas fa-sign-in-alt"></i> Quên mật khẩu
              </router-link>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#registerModal"
            >
              <i class="fas fa-user-plus"></i> Đăng ký
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal đăng ký -->
    <div
      class="modal fade"
      id="registerModal"
      tabindex="-1"
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
      v-show="registerModalShown"
    >
      <!-- Nội dung modal đăng ký -->
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="registerModalLabel">
              <i class="fas fa-user-plus"></i> Đăng ký
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <!-- Form đăng ký -->
            <form @submit.prevent="register">
              <div class="mb-3">
                <label for="registerName" class="form-label"
                  ><i class="fas fa-user"></i> Tên</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="registerName"
                  placeholder="Nhập tên của bạn"
                  v-model="register_form.name"
                />
              </div>
              <div class="mb-3">
                <label for="registerEmail" class="form-label"
                  ><i class="fas fa-envelope"></i> Email</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="registerEmail"
                  placeholder="Nhập email của bạn"
                  v-model="register_form.email"
                />
              </div>
              <div class="mb-3">
                <label for="registerPassword" class="form-label"
                  ><i class="fas fa-lock"></i> Mật khẩu</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="registerPassword"
                  placeholder="Nhập mật khẩu của bạn"
                  v-model="register_form.password"
                />
              </div>
              <button
                type="submit"
                class="btn btn-success"
                data-bs-dismiss="modal"
              >
                <i class="fas fa-user-plus"></i> Đăng ký
              </button>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              <i class="fas fa-sign-in-alt"></i> Đăng nhập
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
 <script>
 import { computed } from 'vue';
import { ref } from "vue";
import { useStore } from "vuex";
import router from "@/router"; // Đường dẫn phải chính xác với vị trí file router của bạn

export default {
  name: "LoginComponent",
  setup() {
    const login_form = ref({});
    const register_form = ref({});
    const store = useStore();
    const registerModalShown = ref(false);
   
    const login = async () => {
      try {
        await store.dispatch("login", login_form.value);
        router.replace("admin");
        hideModal();
      } catch (error) {
        console.error(error);
        router.replace("/");
      }
    };

    const register = async () => {
      try {
        await store.dispatch("register", register_form.value);
        router.replace("/");
      } catch (error) {
        console.error(error);
      }
    };
    
    const hideModal = () => {
      $('#loginModal').modal('hide'); // Ẩn modal
      $('.modal-backdrop').hide(); // Ẩn lớp nền (modal backdrop)
    };
    const user = computed(() => store.state.user);
    
    
    return {
      login_form,
      register_form,
      registerModalShown,
      login,
      register,
      user
    };
  },
  methods:{
    an(){
      $('#loginModal').modal('hide');
    }
  }
};
</script>


  
  <style scoped>
/* Tùy chỉnh CSS cho modal */
.modal-content {
  background: linear-gradient(to bottom right, #4a00e0, #8e2de2);
  color: white;
}

.modal-header {
  border-bottom: none;
}

.modal-title {
  display: flex;
  align-items: center;
  font-size: 1.5rem;
}

.modal-body {
  padding: 2rem;
}

.form-label {
  display: flex;
  align-items: center;
}

.btn-primary {
  background-color: #ff4c29;
  border-color: #ff4c29;
}

.btn-primary:hover {
  background-color: #ff6b3a;
  border-color: #ff6b3a;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #218838;
}
</style>
  