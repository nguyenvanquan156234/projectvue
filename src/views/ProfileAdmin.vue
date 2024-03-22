<template>
    <div class="container">
      <div class="profile">
        <div class="profile-info">
          <h3>Thông tin tài khoản:</h3>
          <p><strong>Email:</strong> {{ email }}</p>
          <!-- Hiển thị các thông tin khác về tài khoản người dùng nếu cần -->
        </div>
      </div>
      <div class="change-password">
        <h3>Thay đổi mật khẩu:</h3>
        <div class="form-group">
          <label for="inputEmail">Email:</label>
          <input type="email" id="inputEmail" v-model="email" class="form-control">
        </div>
        <div class="form-group">
          <label for="currentPassword">Mật khẩu hiện tại:</label>
          <input type="password" id="currentPassword" v-model="currentPassword" class="form-control">
        </div>
        <div class="form-group">
          <label for="newPassword">Mật khẩu mới:</label>
          <input type="password" id="newPassword" v-model="newPassword" class="form-control">
        </div>
        <div class="form-group">
          <label for="confirmNewPassword">Xác nhận mật khẩu mới:</label>
          <input type="password" id="confirmNewPassword" v-model="confirmNewPassword" class="form-control">
        </div>
        <div class="form-group">
          <button class="btn btn-primary" @click="changePassword">Thay đổi mật khẩu</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { getAuth, updatePassword, sendPasswordResetEmail } from "firebase/auth";
  
  export default {
    data() {
      return {
        email: '',
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      };
    },
    created() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        this.email = user.email;
      }
    },
    methods: {
      async changePassword() {
        if (this.newPassword !== this.confirmNewPassword) {
          alert("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
          return;
        }
  
        try {
          const auth = getAuth();
          const user = auth.currentUser;
          if (user) {
            // Kiểm tra nếu trường email đã được nhập và nếu được, gửi email đặt lại mật khẩu
            if (this.email !== '') {
              await sendPasswordResetEmail(auth, this.email);
              alert("Email đặt lại mật khẩu đã được gửi. Vui lòng kiểm tra hòm thư đến của bạn.");
              return;
            }
            
            // Nếu không, thực hiện thay đổi mật khẩu
            await updatePassword(user, this.newPassword);
            alert("Thay đổi mật khẩu thành công.");
            this.currentPassword = '';
            this.newPassword = '';
            this.confirmNewPassword = '';
          }
        } catch (error) {
          console.error("Lỗi khi thay đổi mật khẩu:", error.message);
          alert("Đã xảy ra lỗi khi thay đổi mật khẩu. Vui lòng thử lại sau.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background: linear-gradient(135deg, #3498db, #8e44ad);
    border-radius: 10px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  </style>
  