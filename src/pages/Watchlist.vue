<template>
  <section>
    <header class="mb-8">
      <h1 class="text-3xl font-poppins font-semibold text-white">My Watchlist</h1>
      <p class="mt-2 text-sm text-white/60">
        Products you save appear here so you can track pricing, reviews, and viral growth at a glance.
      </p>
    </header>

    <div v-if="watchlistProducts.length" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <ProductCard v-for="product in watchlistProducts" :key="product.id" :product="product" />
    </div>

    <div v-else class="rounded-3xl border border-dashed border-white/10 bg-white/5 p-16 text-center text-white/60">
      <p class="text-lg">Your watchlist is empty.</p>
      <RouterLink to="/" class="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
        Discover trending products →
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { RouterLink } from 'vue-router';
import ProductCard from '../components/ProductCard.vue';
import { useProductsStore } from '../store/products';

const productsStore = useProductsStore();

onMounted(() => {
  if (!productsStore.products.length) {
    productsStore.fetchAllProducts();
  }
});

const watchlistProducts = computed(() =>
  productsStore.products.filter((product) => productsStore.isInWatchlist(product.id))
);
</script>
