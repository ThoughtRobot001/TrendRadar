<template>
  <div class="min-h-screen bg-slate-950">
    <Navbar />
    <AuthModal />
    <main class="mx-auto w-full max-w-7xl px-4 pb-16 pt-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import Navbar from './components/Navbar.vue';
import AuthModal from './components/AuthModal.vue';
</script>
