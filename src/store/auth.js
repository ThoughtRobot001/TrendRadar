import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import {
  initFirebase,
  getAuthClient,
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  logout
} from '../services/firebase';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const showAuthModal = ref(false);
  const mode = ref('login');

  initFirebase();
  const auth = getAuthClient();

  if (auth) {
    auth.onAuthStateChanged((firebaseUser) => {
      user.value = firebaseUser;
    });
  }

  const isAuthenticated = computed(() => Boolean(user.value));

  const toggleAuthModal = (value) => {
    showAuthModal.value = value ?? !showAuthModal.value;
    error.value = null;
  };

  const setMode = (value) => {
    mode.value = value;
    error.value = null;
  };

  const handleEmailAuth = async (credentials) => {
    if (!auth) {
      error.value = 'Firebase is not configured yet.';
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      if (mode.value === 'login') {
        await loginWithEmail(credentials.email, credentials.password);
      } else {
        await registerWithEmail(credentials.email, credentials.password);
      }
      toggleAuthModal(false);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const handleGoogleLogin = async () => {
    if (!auth) {
      error.value = 'Firebase is not configured yet.';
      return;
    }

    loading.value = true;
    error.value = null;

    try {
      await loginWithGoogle();
      toggleAuthModal(false);
    } catch (err) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  };

  const handleLogout = async () => {
    if (!auth) {
      user.value = null;
      return;
    }

    try {
      await logout();
    } catch (err) {
      error.value = err.message;
    }
  };

  return {
    user,
    loading,
    error,
    showAuthModal,
    mode,
    isAuthenticated,
    toggleAuthModal,
    setMode,
    handleEmailAuth,
    handleGoogleLogin,
    handleLogout
  };
});
