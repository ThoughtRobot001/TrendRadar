import { computed, watch } from 'vue';
import { useAuthStore } from '../store/auth';
import { fetchWatchlist, upsertWatchlist } from './firebase';

const LOCAL_STORAGE_KEY = 'trendradar_watchlist';

export const loadWatchlist = () => {
  if (typeof window === 'undefined') {
    return [];
  }
  try {
    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load watchlist from localStorage', error);
    return [];
  }
};

export const saveWatchlist = (productIds) => {
  try {
    if (typeof window === 'undefined') {
      return;
    }
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(productIds));
  } catch (error) {
    console.error('Failed to persist watchlist', error);
  }
};

export const syncWatchlistWithFirebase = () => {
  const authStore = useAuthStore();

  watch(
    () => authStore.user,
    async (user) => {
      if (!user) {
        return;
      }
      const productIds = await fetchWatchlist(user.uid);
      saveWatchlist(productIds);
    },
    { immediate: true }
  );

  const watchlist = computed(() => loadWatchlist());

  watch(
    () => watchlist.value,
    async (productIds) => {
      if (!authStore.user) {
        return;
      }
      await upsertWatchlist(authStore.user.uid, productIds);
    }
  );
};
