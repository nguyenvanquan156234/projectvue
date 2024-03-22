import { createStore } from 'vuex';
import { auth } from '../firebase.js'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'; 
import router from '@/router/index.js';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from "../firebase.js";
let cart = window.localStorage.getItem('cart')
let orders = window.localStorage.getItem('orders');
export default createStore({
  state: {
    user: null,
    products: [],
    cart:cart?JSON.parse(cart):[],
    orders: orders ? JSON.parse(orders) : [],
    search:[]
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    addOrder(state, order) {
      
      state.orders.push(order);
      window.localStorage.setItem('orders', JSON.stringify(state.orders));
    },
    CLEAR_CART(state) {
      state.cart = [];
      window.localStorage.removeItem('cart');
    },
    addToCart(state, item) {
      let found = state.cart.find(product => product.productId === item.productId);

    
      if (found) {
        found.productQuantity++; // Tăng số lượng của sản phẩm đã tồn tại trong giỏ hàng
      } else {
        // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm sản phẩm mới vào giỏ hàng
        state.cart.push(item);

      }
      this.commit('saveData')
    },
    saveData(){
      window.localStorage.setItem('cart', JSON.stringify(this.state.cart));
    },
    setProducts(state, products) {
      state.products = products;
    },
    setSearchResults(state, searchResults) {
      state.search = searchResults  // Cập nhật kết quả tìm kiếm vào state
    },
    removeFromCart(state, item){
          let index = state.cart.indexOf(item);
      // Kiểm tra xem mục có tồn tại trong mảng không
      if (index !== -1) {
        // Nếu tồn tại, sử dụng splice để loại bỏ mục khỏi mảng
        state.cart.splice(index, 1);
        this.commit('saveData');
      }
    }
    
  },
  getters: {
    lastOrder(state) {
      return state.orders.length > 0 ? state.orders[state.orders.length - 1] : null;
    }
  },
  actions: {
    
     // Action để lưu thông tin đơn hàng vào state
     async saveOrder({ commit }, orderInfo) {
      try {
        // Gọi mutation để thêm đơn hàng vào danh sách
        commit('addOrder', orderInfo);

        // Xóa giỏ hàng sau khi thanh toán thành công (tuỳ thuộc vào yêu cầu)
        commit('CLEAR_CART');

        // Nếu cần lưu thông tin đơn hàng vào localStorage, thực hiện ở đây
        window.localStorage.setItem('orders', JSON.stringify(this.state.orders));

        return Promise.resolve(); // Trả về promise thành công nếu không có lỗi xảy ra
      } catch (error) {
        // Xử lý lỗi nếu cần
        return Promise.reject(error);
      }
    },
    async login({ commit }, details) {
      const { email, password } = details;
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        commit('SET_USER', user);
        return user; // Trả về thông tin người dùng sau khi đăng nhập thành công
      } catch(err) {
        console.error(err); // Ghi log lỗi vào console để xem thông tin chi tiết
        switch(err.code) {
          case 'auth/invalid-credential':
            alert('Email hoặc mật khẩu không đúng. Vui lòng thử lại.');
            break;
          case 'auth/email-already-in-use':
            alert('Email đã được sử dụng');
            break;
          case 'auth/invalid-email':
            alert('Email không hợp lệ');
            break;
          case 'auth/operation-not-allowed':
            alert('Thao tác không được phép');
            break;
          default:
            alert('Đã xảy ra lỗi');
        }
        throw err;
      }
      
    },
  

    
    async register({ commit }, details) {
      const { email, password } = details;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        commit('SET_USER', user);
        return user;
      } catch(err) {
        switch(err.code) {
          case 'auth/email-already-in-use':
            alert('Email đã được sử dụng');
            break;
          case 'auth/invalid-email':
            alert('Email không hợp lệ');
            break;
          default:
            alert('Đã xảy ra lỗi');
        }
        throw new Error('Registration failed');// Throw error để cho phép component hoặc nơi gọi action xử lý logic ở nơi đó
      }
    },
    async logout({ commit }) {
      try {
        await signOut(auth);
        commit('CLEAR_USER');
      } catch(err) {
        console.error(err);
      }
    },
    fetchUser({commit}){
      auth.onAuthStateChanged(async user =>{
        if(user === null){
          commit('CLEAR_USER')
        }else{
          commit('SET_USER', user)
          if(router.isReady() && router.currentRoute.value.path === '/'){
            router.push('/')
          }
        }
      })
    },
    async search({ commit }, searchTerm) {
      try {
        const querySnapshot = await getDocs(
          query(collection(db, 'products'), where('name', '==', searchTerm))
        );
        const searchResults = querySnapshot.docs.map(doc => doc.data());
        commit('setSearchResults', searchResults); // Commit mutation để cập nhật kết quả tìm kiếm
      } catch (error) {
        console.error('Error searching:', error);
      }
    }
    
    
    
    
  }
});
