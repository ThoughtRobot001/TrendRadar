import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import ProductDetails from '../pages/ProductDetails.vue';
import Watchlist from '../pages/Watchlist.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/product/:id',
    name: 'product-details',
    component: ProductDetails,
    props: true
  },
  {
    path: '/watchlist',
    name: 'watchlist',
    component: Watchlist,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) {
    next();
    return;
  }

  import('../store/auth').then(({ useAuthStore }) => {
    const authStore = useAuthStore();
    if (authStore.isAuthenticated) {
      next();
    } else {
      authStore.toggleAuthModal(true);
      next(false);
    }
  });
});

export default router;
