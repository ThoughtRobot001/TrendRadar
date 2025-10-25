<template>
  <TransitionRoot :show="authStore.showAuthModal" as="template">
    <Dialog as="div" class="relative z-50" @close="authStore.toggleAuthModal(false)">
      <TransitionChild
        as="template"
        enter="ease-out duration-150"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-100"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-950/70 backdrop-blur" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="ease-out duration-200"
            enter-from="opacity-0 translate-y-2"
            enter-to="opacity-100 translate-y-0"
            leave="ease-in duration-150"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-1"
          >
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-3xl border border-white/10 bg-slate-900/90 p-8 text-left align-middle shadow-2xl">
              <DialogTitle class="text-2xl font-semibold text-white">
                {{ authStore.mode === 'login' ? 'Welcome back' : 'Create an account' }}
              </DialogTitle>
              <p class="mt-2 text-sm text-white/60">
                Sign in to save products to your watchlist and track their performance over time.
              </p>

              <form class="mt-6 space-y-4" @submit.prevent="handleSubmit">
                <div>
                  <label class="text-xs uppercase tracking-wide text-white/50">Email</label>
                  <input
                    v-model="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    class="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-0"
                  />
                </div>
                <div>
                  <label class="text-xs uppercase tracking-wide text-white/50">Password</label>
                  <input
                    v-model="password"
                    type="password"
                    required
                    minlength="6"
                    class="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-0"
                  />
                </div>
                <button
                  type="submit"
                  class="flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3 text-sm font-semibold text-primary transition hover:bg-accent/90"
                  :disabled="authStore.loading"
                >
                  <span v-if="authStore.loading" class="h-4 w-4 animate-spin rounded-full border-2 border-primary/40 border-t-primary"></span>
                  {{ authStore.mode === 'login' ? 'Sign In' : 'Create Account' }}
                </button>
              </form>

              <button
                class="mt-4 flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white/80 transition hover:bg-white/10"
                @click="authStore.handleGoogleLogin"
              >
                <span class="text-lg">🔐</span>
                Continue with Google
              </button>

              <p v-if="authStore.error" class="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">
                {{ authStore.error }}
              </p>

              <div class="mt-6 text-center text-sm text-white/60">
                <button class="font-semibold text-accent hover:text-accent/80" @click="toggleMode">
                  {{ authStore.mode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Sign in' }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref } from 'vue';
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot
} from '@headlessui/vue';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const handleSubmit = () => {
  authStore.handleEmailAuth({ email: email.value, password: password.value });
};

const toggleMode = () => {
  authStore.setMode(authStore.mode === 'login' ? 'register' : 'login');
};
</script>
