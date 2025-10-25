import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import { fetchProducts, fetchProductById, fetchTrendingKeywords } from '../services/api';
import { useAuthStore } from './auth';
import { fetchWatchlist, upsertWatchlist } from '../services/firebase';
import { loadWatchlist } from '../services/watchlist';

export const useProductsStore = defineStore('products', () => {
  const products = ref([]);
  const trendingKeywords = ref([]);
  const selectedCategory = ref('All');
  const sortOption = ref('Growth');
  const loading = ref(false);
  const lastUpdated = ref(null);
  const error = ref(null);
  const watchlistIds = ref(loadWatchlist());

  const authStore = useAuthStore();

  const filteredProducts = computed(() => {
    let filtered = [...products.value];

    if (selectedCategory.value !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory.value);
    }

    switch (sortOption.value) {
      case 'Orders':
        filtered.sort((a, b) => b.orders - a.orders);
        break;
      case 'Rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        filtered.sort((a, b) => b.trend_growth - a.trend_growth);
    }

    return filtered;
  });

  const fetchAllProducts = async () => {
    loading.value = true;
    error.value = null;
    try {
      const [productData, keywordData] = await Promise.all([
        fetchProducts(),
        fetchTrendingKeywords()
      ]);
      products.value = productData;
      trendingKeywords.value = keywordData;
      lastUpdated.value = new Date().toISOString();
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const getProduct = async (id) => {
    const existing = products.value.find((product) => product.id === id);
    if (existing) {
      return existing;
    }
    return fetchProductById(id);
  };

  const toggleWatchlist = (productId) => {
    if (!authStore.isAuthenticated) {
      authStore.toggleAuthModal(true);
      return;
    }

    if (watchlistIds.value.includes(productId)) {
      watchlistIds.value = watchlistIds.value.filter((id) => id !== productId);
    } else {
      watchlistIds.value = Array.from(new Set([...watchlistIds.value, productId]));
    }
  };

  const isInWatchlist = (productId) => watchlistIds.value.includes(productId);

  watch(
    () => authStore.user,
    async (user) => {
      if (!user) {
        watchlistIds.value = loadWatchlist();
        return;
      }
      try {
        const remote = await fetchWatchlist(user.uid);
        watchlistIds.value = remote?.length ? remote : loadWatchlist();
      } catch (error) {
        console.error('Failed to load watchlist from Firebase', error);
      }
    },
    { immediate: true }
  );

  watch(
    watchlistIds,
    async (ids) => {
      try {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem('trendradar_watchlist', JSON.stringify(ids));
        }
        if (authStore.user) {
          await upsertWatchlist(authStore.user.uid, ids);
        }
      } catch (error) {
        console.error('Failed to sync watchlist', error);
      }
    },
    { deep: true }
  );

  return {
    products,
    trendingKeywords,
    selectedCategory,
    sortOption,
    filteredProducts,
    loading,
    lastUpdated,
    error,
    fetchAllProducts,
    getProduct,
    toggleWatchlist,
    isInWatchlist
  };
});
