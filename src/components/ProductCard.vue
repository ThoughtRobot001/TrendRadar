<template>
  <article
    class="group flex h-full flex-col justify-between rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-black/30 transition hover:-translate-y-1 hover:border-accent/60"
  >
    <div>
      <div class="relative mb-4 overflow-hidden rounded-2xl">
        <img :src="product.image_url" :alt="product.name" class="h-48 w-full object-cover transition group-hover:scale-105" />
        <span class="absolute left-3 top-3 rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-primary">
          {{ product.category }}
        </span>
      </div>
      <div class="mb-4 flex items-start justify-between">
        <h3 class="text-lg font-semibold text-white">
          {{ product.name }}
        </h3>
        <span class="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
          Viral Score {{ product.viral_score }}
        </span>
      </div>
      <div class="mb-4 grid grid-cols-2 gap-3 text-sm text-white/70">
        <div>
          <p class="text-xs uppercase tracking-wide text-white/50">Price Range</p>
          <p class="font-medium text-white">{{ product.price_range }}</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-wide text-white/50">Orders</p>
          <p class="font-medium text-white">{{ product.orders.toLocaleString() }}</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-wide text-white/50">Reviews</p>
          <p class="font-medium text-white">{{ product.reviews.toLocaleString() }}</p>
        </div>
        <div>
          <p class="text-xs uppercase tracking-wide text-white/50">Rating</p>
          <p class="font-medium text-white">{{ product.rating.toFixed(1) }} ⭐</p>
        </div>
      </div>
      <TrendChart :data="product.seven_day_trend" compact />
    </div>
    <div class="mt-6 flex items-center justify-between">
      <RouterLink
        :to="`/product/${product.id}`"
        class="rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
      >
        View Details
      </RouterLink>
      <button
        class="rounded-full border border-accent/60 px-4 py-2 text-sm font-semibold text-accent transition hover:bg-accent hover:text-primary"
        @click="productsStore.toggleWatchlist(product.id)"
      >
        {{ productsStore.isInWatchlist(product.id) ? 'Saved' : 'Add to Watchlist' }}
      </button>
    </div>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import TrendChart from './TrendChart.vue';
import { useProductsStore } from '../store/products';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const productsStore = useProductsStore();
</script>
