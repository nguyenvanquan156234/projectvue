<template>
    <div class="hero">
      <div class="container h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-7">
            <div class="hero-content">
              <h1 class="hero-title">
               Chào mừng bạn đến với Shop Công Nghệ
              </h1>
              <p>
  Chào mừng bạn đến với cửa hàng Vue dành cho các nhà phát triển. Chúng tôi cung cấp các sản phẩm công nghệ hàng đầu, giúp bạn tiếp cận với những công nghệ mới nhất và giải pháp tiện ích cho nhu cầu của bạn.
</p>
              <div class="hero-btn mt-5">
                <button class="btn custom-btn btn-info mr-4">Explore</button>
                <a href="#pro" class="btn custom-btn btn-primary">Products</a>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="graphic">
              <img src="../assets/tải xuống.jpg" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "tranChuComponent",
    props: {
      msg: String
    }
  };
  </script>
  
  <style scoped>
  .hero {
    background: linear-gradient(to right, #df56e6, #4e490e);
    color: white;
    padding: 100px 0;
  }
  
  .hero-title {
    font-size: 3rem;
  }
  
  .hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
  .hero-btn .btn {
    font-size: 1.2rem;
  }
  
  .graphic img {
    width: 100%;
    height: auto;
  }
  </style>
  