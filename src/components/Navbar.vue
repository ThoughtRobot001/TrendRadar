<template>
  <header class="bg-primary/80 backdrop-blur">
    <nav class="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4">
      <RouterLink to="/" class="flex items-center gap-3 text-white">
        <div class="rounded-full bg-accent/20 p-2">
          <span class="text-2xl">📈</span>
        </div>
        <p class="text-xl font-poppins font-semibold tracking-wide">TrendRadar</p>
      </RouterLink>
      <div class="flex items-center gap-6">
        <RouterLink
          to="/"
          class="text-sm font-medium text-white/80 transition hover:text-white"
        >
          Dashboard
        </RouterLink>
        <RouterLink
          to="/watchlist"
          class="text-sm font-medium text-white/80 transition hover:text-white"
        >
          My Watchlist
        </RouterLink>
        <button
          v-if="!authStore.isAuthenticated"
          class="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-primary transition hover:bg-accent/90"
          @click="authStore.toggleAuthModal(true)"
        >
          Sign In
        </button>
        <Menu as="div" v-else class="relative text-left">
          <MenuButton class="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm">
            <span class="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-primary font-semibold">
              {{ initials }}
            </span>
            <span class="text-white/80">{{ authStore.user.email }}</span>
          </MenuButton>
          <Transition
            enter-active-class="transition duration-150 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
          >
            <MenuItems
              class="absolute right-0 mt-3 w-48 origin-top-right rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-xl"
            >
              <MenuItem>
                <button
                  class="w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 hover:bg-white/5"
                  @click="authStore.handleLogout"
                >
                  Log out
                </button>
              </MenuItem>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/vue';
import { useAuthStore } from '../store/auth';

const authStore = useAuthStore();

const initials = computed(() => {
  if (!authStore.user?.email) {
    return 'TR';
  }
  return authStore.user.email
    .split('@')[0]
    .split('.')
    .map((segment) => segment.charAt(0).toUpperCase())
    .join('')
    .slice(0, 2);
});
</script>
