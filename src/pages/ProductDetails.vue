<template>
  <section v-if="product" class="space-y-10">
    <div class="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <div class="space-y-6">
        <div class="overflow-hidden rounded-3xl border border-white/10">
          <img :src="product.image_url" :alt="product.name" class="h-96 w-full object-cover" />
        </div>
        <div class="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h1 class="text-3xl font-poppins font-semibold text-white">{{ product.name }}</h1>
          <div class="flex flex-wrap gap-3 text-sm text-white/70">
            <span class="rounded-full bg-accent/20 px-4 py-1 text-accent">{{ product.category }}</span>
            <span class="rounded-full bg-white/5 px-4 py-1">Orders {{ product.orders.toLocaleString() }}</span>
            <span class="rounded-full bg-white/5 px-4 py-1">Reviews {{ product.reviews }}</span>
            <span class="rounded-full bg-white/5 px-4 py-1">Rating {{ product.rating.toFixed(1) }}⭐</span>
            <span class="rounded-full bg-white/5 px-4 py-1">Growth +{{ product.trend_growth }}%</span>
          </div>
          <p class="text-sm leading-relaxed text-white/70">
            This product is trending across social platforms and marketplaces. Analyze its engagement metrics and supplier details to determine if it is a good fit for your Shopify store.
          </p>
          <div class="flex flex-wrap items-center gap-4">
            <a
              :href="product.supplier_link"
              target="_blank"
              class="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-primary transition hover:bg-accent/90"
            >
              View Supplier
            </a>
            <button
              class="rounded-full border border-accent/60 px-5 py-3 text-sm font-semibold text-accent transition hover:bg-accent hover:text-primary"
              @click="productsStore.toggleWatchlist(product.id)"
            >
              {{ productsStore.isInWatchlist(product.id) ? 'Remove from Watchlist' : 'Add to Watchlist' }}
            </button>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <h2 class="text-xl font-semibold text-white">Key Metrics</h2>
          <dl class="mt-4 space-y-4 text-sm text-white/70">
            <div class="flex items-center justify-between">
              <dt class="uppercase tracking-wide text-white/50">Price Range</dt>
              <dd class="font-medium text-white">{{ product.price_range }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="uppercase tracking-wide text-white/50">Viral Score</dt>
              <dd class="font-medium text-white">{{ product.viral_score }}</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="uppercase tracking-wide text-white/50">Week-over-week Growth</dt>
              <dd class="font-medium text-accent">+{{ product.trend_growth }}%</dd>
            </div>
            <div class="flex items-center justify-between">
              <dt class="uppercase tracking-wide text-white/50">Added</dt>
              <dd class="font-medium text-white">{{ formattedDate }}</dd>
            </div>
          </dl>
        </div>
        <div class="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-semibold text-white">7-Day Growth Trend</h2>
            <span class="text-xs uppercase tracking-wide text-white/50">Trend Momentum</span>
          </div>
          <TrendChart :data="product.seven_day_trend" />
        </div>
      </div>
    </div>
  </section>

  <div v-else class="flex min-h-[40vh] items-center justify-center text-white/60">
    Loading product details...
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import TrendChart from '../components/TrendChart.vue';
import { useProductsStore } from '../store/products';

const route = useRoute();
const productsStore = useProductsStore();
const product = ref(null);

const formattedDate = computed(() => {
  if (!product.value?.created_at) {
    return 'Unknown';
  }
  return new Date(product.value.created_at).toLocaleDateString();
});

const loadProduct = async () => {
  const result = await productsStore.getProduct(route.params.id);
  product.value = result;
};

onMounted(loadProduct);
watch(
  () => route.params.id,
  () => {
    loadProduct();
  }
);
</script>
