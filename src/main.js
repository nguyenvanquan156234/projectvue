import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import router ở đây
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import store from '@/store'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min';
import '../node_modules/@popperjs/core/lib/index';
import {vueFireStore} from 'vue-firestore'
import VueCarousel from 'vue-carousel';

let app = ''

const firebaseAuth = getAuth(); // Đổi tên biến thành firebaseAuth hoặc một tên khác phù hợp

onAuthStateChanged(firebaseAuth, (user) => {
  if (!app) {
    createApp(App).use(store).use(router).use(VueCarousel).use(vueFireStore).mount('#app');
  } else {
    alert("lỗi")
  }
});
