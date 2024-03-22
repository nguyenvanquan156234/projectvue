import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AdminView from '../views/AdminView.vue';
import ThongKeDonHang from '@/views/ThongKeDonHang.vue';
import ProductsAdmin from '../views/ProductsAdmin.vue';
import { auth } from '../firebase'; // Import getAuth từ 'firebase/auth'
import ProfileAdmin from '@/views/ProfileAdmin.vue';
import OderAdmin from '@/views/OderAdmin.vue';
import QuenMK from '@/views/QuenMK.vue';
import CheckOut from '@/views/CheckOut.vue';
import ShowDonHang from '@/views/ShowDonHang.vue';
import SearchResults from '@/views/SearchResults.vue';
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/quen',
    name: 'quen',
    component: QuenMK
  },
  {
    path: '/search',
    name: 'SearchResults',
    component: SearchResults
  },
  {
    path: '/order',
    name: 'order',
    component: ShowDonHang
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: CheckOut
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    meta:{
      requiresAuth : true
    },
    children: [
      {
        path: 'thongkedonhang', // Empty path to display the OverView component by default
        name: 'thongkedonhang',
        component: ThongKeDonHang
      },
      {
        path: 'products',
        name: 'products',
        component: ProductsAdmin
      },
      {
        path: 'orders',
        name: 'oders',
        component: OderAdmin
      },
      {
        path: 'profile',
        name: 'profile',
        component: ProfileAdmin
      },
      
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from , next ) =>{
  if(to.path ==='/admin ' && auth.currentUser){
    next ('/admin')
    return
  }
  if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser && to.path === '/admin'){
    next('/')
    return
  }
  next()
})  







export default router;
