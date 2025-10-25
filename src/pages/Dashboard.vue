<template>
  <section>
    <header class="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 class="text-3xl font-poppins font-semibold text-white">🔥 Trending Products This Week</h1>
        <p class="mt-2 max-w-2xl text-sm text-white/60">
          Discover viral-ready products sourced from AliExpress, TikTok, Google Trends, and Etsy. Updated daily with engagement insights and growth signals.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="keyword in productsStore.trendingKeywords"
          :key="keyword.keyword"
          class="rounded-full bg-white/5 px-4 py-2 text-xs font-medium text-white/70"
        >
          {{ keyword.keyword }} <span class="text-accent">+{{ keyword.growth }}%</span>
        </span>
      </div>
    </header>

    <FilterBar />

    <TransitionRoot :show="!productsStore.loading" appear>
      <TransitionChild
        enter="duration-300"
        enter-from="opacity-0 translate-y-2"
        enter-to="opacity-100 translate-y-0"
        leave="duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <ProductCard v-for="product in productsStore.filteredProducts" :key="product.id" :product="product" />
        </div>
      </TransitionChild>
    </TransitionRoot>

    <div v-if="productsStore.loading" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="n in 6" :key="n" class="h-96 animate-pulse rounded-3xl bg-white/5" />
    </div>

    <div v-if="productsStore.error" class="mt-8 rounded-2xl bg-red-500/10 p-6 text-red-300">
      {{ productsStore.error }}
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { TransitionChild, TransitionRoot } from '@headlessui/vue';
import { useProductsStore } from '../store/products';
import FilterBar from '../components/FilterBar.vue';
import ProductCard from '../components/ProductCard.vue';

const productsStore = useProductsStore();

onMounted(() => {
  productsStore.fetchAllProducts();
});
</script>
