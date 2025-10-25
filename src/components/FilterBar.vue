<template>
  <div class="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4 md:flex-row md:items-center md:justify-between">
    <div class="flex flex-wrap items-center gap-2">
      <button
        v-for="category in categories"
        :key="category"
        class="rounded-full px-4 py-2 text-sm font-medium transition"
        :class="
          productsStore.selectedCategory === category
            ? 'bg-accent text-primary shadow-lg shadow-accent/20'
            : 'bg-white/5 text-white/70 hover:bg-white/10'
        "
        @click="productsStore.selectedCategory = category"
      >
        {{ category }}
      </button>
    </div>
    <div class="flex items-center gap-3">
      <label class="text-xs uppercase tracking-wide text-white/50">Sort By</label>
      <select
        v-model="productsStore.sortOption"
        class="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 focus:border-accent focus:ring-0"
      >
        <option>Growth</option>
        <option>Orders</option>
        <option>Rating</option>
      </select>
      <div class="hidden text-xs uppercase tracking-wide text-white/50 md:block">
        Updated {{ lastUpdatedRelative }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useProductsStore } from '../store/products';

const categories = ['All', 'Home', 'Beauty', 'Pets', 'Fitness', 'Tech'];
const productsStore = useProductsStore();

const lastUpdatedRelative = computed(() => {
  if (!productsStore.lastUpdated) {
    return 'just now';
  }
  const diff = Date.now() - Date.parse(productsStore.lastUpdated);
  const hours = Math.round(diff / (1000 * 60 * 60));
  if (hours < 1) {
    return 'moments ago';
  }
  if (hours < 24) {
    return `${hours}h ago`;
  }
  return `${Math.round(hours / 24)}d ago`;
});
</script>
